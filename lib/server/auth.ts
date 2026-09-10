import { compare } from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { findAdminUserById, findUserByEmail } from "@/lib/server/db-queries";
import { unauthorized } from "@/lib/server/http";

const DEFAULT_JWT_EXPIRES_IN = 60 * 60 * 24;

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

type TokenPayload = JwtPayload & {
  sub: string;
  email: string;
  is_admin: boolean;
};

export function getJwtExpiresIn() {
  const value = Number(process.env.JWT_EXPIRES_IN);
  return Number.isInteger(value) && value > 0 ? value : DEFAULT_JWT_EXPIRES_IN;
}

export async function validateLogin(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) return null;

  const isValidPassword = await compare(password, user.passwordHash);
  if (!isValidPassword) return null;

  return toAuthUser(user);
}

export function createAccessToken(user: AuthUser) {
  return jwt.sign(
    {
      email: user.email,
      is_admin: user.is_admin,
    },
    getJwtSecret(),
    {
      expiresIn: getJwtExpiresIn(),
      subject: String(user.id),
    },
  );
}

export async function getAuthUser(request: Request) {
  const token = getBearerToken(request);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    if (typeof decoded === "string" || !decoded.sub) return null;

    const tokenPayload = decoded as TokenPayload;
    const userId = Number(tokenPayload.sub);
    if (!Number.isInteger(userId)) return null;

    const user = await findAdminUserById(userId);
    if (!user) return null;

    return toAuthUser(user);
  } catch {
    return null;
  }
}

export async function requireAdmin(request: Request) {
  const user = await getAuthUser(request);
  if (!user) return { response: unauthorized() };

  return { user };
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;

  return authorization.slice("Bearer ".length).trim();
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production.");
  }

  return "local-development-secret";
}

function toAuthUser(user: {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    is_admin: user.isAdmin,
  };
}
