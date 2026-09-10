# Thant Zin Htet Portfolio

Personal portfolio website and admin panel built with Next.js, React 19, Prisma 8, PostgreSQL, JWT auth, and Tailwind CSS.

## Live Website

The current static GitHub Pages site is served from the `development` branch:

https://z1p4u.github.io/

The `main` branch is now the full-stack Next.js version. It needs a Node-compatible host such as Vercel, Render, Railway, or a VPS because GitHub Pages cannot run API routes or Prisma.

## Local Setup

Prisma 8 currently requires Node.js `>=22.18.0` and PostgreSQL `15+`. This project uses PostgreSQL now, not the old SQLite file database.

```bash
npm install
cp .env.example .env
npm run db:emit
npm run db:migrate
npm run db:seed
npm run dev
```

Default local panel login after seeding:

- URL: `http://localhost:3000/panel/login`
- Email: `zipshigoto310801@gmail.com`
- Password: `121212`

Change `PORTFOLIO_ADMIN_EMAIL`, `PORTFOLIO_ADMIN_PASSWORD`, and `JWT_SECRET` before deploying.

Set `DATABASE_URL` to your PostgreSQL database, for example:

```env
DATABASE_URL="postgresql://thantzinhtet@localhost:5432/z1p4u_portfolio"
```

PostgreSQL 16 is installed through Homebrew as `postgresql@16`. Since `postgresql@14` is still the linked command-line version, use the versioned binaries when you need direct CLI access:

```bash
brew services start postgresql@16
/opt/homebrew/opt/postgresql@16/bin/psql -h 127.0.0.1 -d z1p4u_portfolio
```

Set `APP_URL` and `NEXT_PUBLIC_SITE_URL` to the deployed frontend origin, for example `https://your-domain.com`. API requests with a different browser `Origin` are rejected.

## Prisma 8 Workflow

The Prisma source of truth is [prisma/schema.prisma](prisma/schema.prisma). After changing it, run:

```bash
npm run db:emit
```

That emits:

- `prisma/schema.json`
- `prisma/schema.d.ts`

Both generated files should be committed. App code imports the Prisma 8 runtime from [prisma/db.ts](prisma/db.ts), and server route queries live in [lib/server/db-queries.ts](lib/server/db-queries.ts).

Common commands:

```bash
npm run db:emit       # regenerate Prisma 8 contract files
npm run db:init       # first-time DB bootstrap and contract signing
npm run db:update     # apply contract changes during development
npm run db:migrate    # apply committed migration packages
npm run db:verify     # verify DB shape matches the contract
npm run db:seed       # seed portfolio data and admin user
```

The initial Prisma 8 migration package is in `migrations/app/20260907T1057_init`.

## API Protection

- CORS/origin guard is applied to `/api/*`.
- Browser requests must come from the same deployed frontend origin.
- Contact submissions are limited to `3` per `10` minutes and `12` per day per IP.
- Login attempts are limited to `8` per `15` minutes per IP.
- Panel API calls are limited to `240` per minute per IP.
- Contact spam checks include a honeypot field, minimum submit time, max field lengths, repeated-message suppression, and link-count limits.

The rate limiter is in-memory, which is fine for local development and a single Node process. For production serverless/multi-instance hosting, use Redis/Upstash or your host firewall for shared rate limits.

## Package Notes

`@prisma/orm-postgres` is a runtime dependency and `prisma` is a dev dependency. The old `@prisma/client` package is no longer used.

`npm audit --omit=dev` is clean. Full `npm audit` still reports Prisma 8 RC CLI/tooling vulnerabilities; npm's suggested fix is to downgrade to Prisma 7, which conflicts with the goal of learning Prisma 8.

## Gmail Contact Notifications

Contact form submissions are saved to the database and shown in the panel request inbox. They also send a Gmail/SMTP notification when these env vars are configured:

```bash
MAIL_HOST="smtp.gmail.com"
MAIL_PORT="587"
MAIL_USER="your-gmail@gmail.com"
MAIL_PASSWORD="your-google-app-password"
MAIL_FROM="your-gmail@gmail.com"
PORTFOLIO_CONTACT_TO="zipshigoto310801@gmail.com"
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Redux Toolkit / RTK Query
- Prisma 8 / Prisma Next
- PostgreSQL
- JWT
- Nodemailer

## Contact

- Portfolio: https://z1p4u.github.io/
- GitHub: https://github.com/Z1p4U
- LinkedIn: https://www.linkedin.com/in/YOUR-LINKEDIN

## Available For

- Freelance Projects
- Part-time Opportunities

Remote preferred. Open to on-site opportunities in Thailand and Vietnam.
