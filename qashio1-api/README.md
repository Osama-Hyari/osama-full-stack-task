# Simple Expense Tracker API (NestJS)

Backend implementation for the assignment, including transactions, categories, budgets, event-driven hooks, validation, centralized error handling, and Swagger docs.

## Implemented Features

### Transactions
- `POST /transactions`
- `GET /transactions`
- `GET /transactions/summary/report`
- `GET /transactions/:id`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`

Transaction properties:
- `amount`
- `categoryId`
- `date`
- `type` (`income | expense`)

Advanced fetching on `GET /transactions`:
- Pagination: `page`, `limit`
- Sorting: `sortBy` (`date | amount | createdAt`), `sortOrder` (`ASC | DESC`)
- Filtering: `type`, `categoryId`, `dateFrom`, `dateTo`, `minAmount`, `maxAmount`

Summary endpoint on `GET /transactions/summary/report`:
- Returns total income, total expense, and net
- Supports optional `dateFrom` and `dateTo`

### Categories
- `POST /categories`
- `GET /categories`

Each transaction must reference a valid category.

### Budgets
- `POST /budgets`
- `GET /budgets`
- `GET /budgets/:id/usage`

Budget properties:
- `amount`
- `categoryId`
- `periodStart`
- `periodEnd`

Usage endpoint returns:
- spent amount
- remaining amount
- percentage used
- over-budget flag

### Event-Driven Pattern
- Emits events when transactions are created/updated:
  - `transaction.created`
  - `transaction.updated`
- Budget listener reacts to events and checks budget usage, then logs status.

### Technical Expectations Covered
- Modular architecture (`categories`, `transactions`, `budgets` modules)
- DTO validation with `class-validator`
- Global validation pipe with whitelist and transform
- Centralized custom exception filter
- Swagger/OpenAPI documentation at `/docs`

## Tech Choices
- NestJS + TypeScript
- TypeORM
- PostgreSQL (default)
- SQLite in-memory for test mode (`NODE_ENV=test`)
- Nest EventEmitter for event-driven processing

## Environment Variables

Optional configuration:

- `PORT` (default `3000`)
- `DB_TYPE` (`postgres` by default, use `sqlite` if needed)
- `DB_HOST` (default `localhost`)
- `DB_PORT` (default `5432`)
- `DB_USER` (default `postgres`)
- `DB_PASSWORD` (default `postgres`)
- `DB_NAME` (default `expense_tracker`, or `:memory:` for tests)
- `DB_SYNC` (`true` by default; set `false` in production)

## Setup

```bash
npm install
npm run start:dev
```

Swagger docs:

- `http://localhost:3000/docs`

## Test Commands

```bash
npm run test
npm run test:e2e
npm run build
```

## Notes

This workspace environment does not currently have `node`/`npm` available in terminal execution, so dependency installation and runtime verification should be executed locally on your machine.
