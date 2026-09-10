import { NextRequest, NextResponse } from "next/server";

type RateLimitRule = {
  name: string;
  limit: number;
  windowMs: number;
  message: string;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitCheck = {
  error: NextResponse | null;
  limit: number;
  remaining: number;
  resetAt: number;
};

const apiRateLimitStore = globalThis as typeof globalThis & {
  __portfolioApiRateLimits?: Map<string, RateLimitBucket>;
};

const buckets =
  apiRateLimitStore.__portfolioApiRateLimits ??
  new Map<string, RateLimitBucket>();

apiRateLimitStore.__portfolioApiRateLimits = buckets;

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const originError = getOriginError(request);
  if (originError) return originError;

  if (request.method === "OPTIONS") {
    return withCorsHeaders(request, new NextResponse(null, { status: 204 }));
  }

  const rateLimitResult = getRateLimitResult(request);
  if (rateLimitResult.error) {
    return withCorsHeaders(
      request,
      withRateLimitHeaders(rateLimitResult.error, rateLimitResult.checks),
    );
  }

  return withCorsHeaders(
    request,
    withRateLimitHeaders(NextResponse.next(), rateLimitResult.checks),
  );
}

export const config = {
  matcher: "/api/:path*",
};

function getOriginError(request: NextRequest) {
  const origin = request.headers.get("origin");
  const methodAllowsMissingOrigin = ["GET", "HEAD", "OPTIONS"].includes(
    request.method,
  );

  if (!origin && methodAllowsMissingOrigin) return null;

  if (!origin) {
    return NextResponse.json(
      { message: "Origin header is required." },
      { status: 403 },
    );
  }

  if (getAllowedOrigins(request).has(origin)) return null;

  return NextResponse.json(
    { message: "Origin is not allowed." },
    { status: 403 },
  );
}

function getAllowedOrigins(request: NextRequest) {
  const origins = new Set<string>([request.nextUrl.origin]);
  const envOrigins = [
    process.env.APP_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ];

  for (const value of envOrigins) {
    const origin = normalizeOrigin(value);
    if (origin) origins.add(origin);
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  return origins;
}

function normalizeOrigin(value: string | null | undefined) {
  if (!value) return null;

  try {
    const withProtocol = value.startsWith("http") ? value : `https://${value}`;
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

function withCorsHeaders(request: NextRequest, response: NextResponse) {
  const origin = request.headers.get("origin");

  response.headers.set("Vary", "Origin");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, Accept",
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  if (origin && getAllowedOrigins(request).has(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  return response;
}

function getRateLimitResult(request: NextRequest) {
  const ip = getClientIp(request);
  const checks: RateLimitCheck[] = [];

  for (const rule of getRateLimitRules(request)) {
    const check = applyRateLimit(rule, ip);
    checks.push(check);
    if (check.error) {
      return {
        error: check.error,
        checks,
      };
    }
  }

  return {
    error: null,
    checks,
  };
}

function getRateLimitRules(request: NextRequest): RateLimitRule[] {
  const path = request.nextUrl.pathname;

  if (path === "/api/v1/contact-messages" && request.method === "POST") {
    return [
      {
        name: "contact:short",
        limit: 3,
        windowMs: 10 * 60 * 1000,
        message: "Too many contact attempts. Please wait before trying again.",
      },
      {
        name: "contact:daily",
        limit: 12,
        windowMs: 24 * 60 * 60 * 1000,
        message: "Daily contact limit reached. Please try again tomorrow.",
      },
    ];
  }

  if (path === "/api/v1/auth/login" && request.method === "POST") {
    return [
      {
        name: "auth:login",
        limit: 8,
        windowMs: 15 * 60 * 1000,
        message: "Too many login attempts. Please wait before trying again.",
      },
    ];
  }

  if (path.startsWith("/api/v1/admin/")) {
    return [
      {
        name: "admin",
        limit: 240,
        windowMs: 60 * 1000,
        message: "Too many panel requests. Please slow down.",
      },
    ];
  }

  return [
    {
      name: "public",
      limit: 300,
      windowMs: 60 * 1000,
      message: "Too many API requests. Please slow down.",
    },
  ];
}

function applyRateLimit(rule: RateLimitRule, ip: string) {
  const now = Date.now();
  const key = `${rule.name}:${ip}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + rule.windowMs;
    buckets.set(key, {
      count: 1,
      resetAt,
    });
    return {
      error: null,
      limit: rule.limit,
      remaining: rule.limit - 1,
      resetAt,
    };
  }

  current.count += 1;

  if (current.count <= rule.limit) {
    return {
      error: null,
      limit: rule.limit,
      remaining: rule.limit - current.count,
      resetAt: current.resetAt,
    };
  }

  const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000);

  return {
    error: NextResponse.json(
      { message: rule.message },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    ),
    limit: rule.limit,
    remaining: 0,
    resetAt: current.resetAt,
  };
}

function withRateLimitHeaders(
  response: NextResponse,
  checks: RateLimitCheck[],
) {
  if (!checks.length) return response;

  const tightestCheck = checks.reduce((current, check) =>
    check.remaining < current.remaining ? check : current,
  );

  response.headers.set("X-RateLimit-Limit", String(tightestCheck.limit));
  response.headers.set(
    "X-RateLimit-Remaining",
    String(Math.max(0, tightestCheck.remaining)),
  );
  response.headers.set(
    "X-RateLimit-Reset",
    String(Math.ceil(tightestCheck.resetAt / 1000)),
  );

  return response;
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";

  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
