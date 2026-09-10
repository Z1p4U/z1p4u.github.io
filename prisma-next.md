# Prisma 8 Notes

This project uses Prisma 8 / Prisma Next with PostgreSQL.

## Source Of Truth

Edit this file when your database shape changes:

```text
prisma/schema.prisma
```

Then regenerate the emitted contract files:

```bash
npm run db:emit
```

Prisma writes these generated files next to the schema:

```text
prisma/schema.json
prisma/schema.d.ts
```

Commit both generated files. Do not edit them by hand.

## Runtime Client

App code imports the runtime client from:

```ts
import { db } from "@/prisma/db";
```

This repo uses the namespace-aware Prisma 8 API:

```ts
const project = await db.orm.public.Project
  .where({ slug: "iku-team", isPublished: true })
  .include("detailSections", (sections) =>
    sections.orderBy([
      (section) => section.sortOrder.asc(),
      (section) => section.id.asc(),
    ]),
  )
  .first();
```

For normal app routes, keep database code in `lib/server/db-queries.ts` so pages and route handlers stay readable.

## Common Commands

```bash
npm run db:emit       # regenerate schema.json and schema.d.ts
npm run db:init       # first-time database setup, creates tables and signs DB
npm run db:update     # apply contract changes during development
npm run db:migrate    # apply planned migration packages
npm run db:verify     # verify DB matches emitted contract
npm run db:seed       # seed portfolio content and admin login
```

## Requirements

Prisma 8 currently needs:

- Node.js `>=22.18.0`; Node 24+ is the smoother choice.
- PostgreSQL 15 or newer.

This machine currently has Node `22.16.0` and PostgreSQL 14 installed, so upgrade both before running the database commands locally.
