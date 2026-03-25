# 🚀 Production Deployment & Credentials

To deploy this project to a production server:

1. Clone or copy the repository to your server.
2. Set environment variables (see .env.example or below).
3. Build and start all services:
	```bash
	docker compose build
	docker compose up -d
	```
4. Make sure required ports are open (80/443 for web, 3000/4000 for app, etc).
5. (Optional) Set up a reverse proxy (Nginx, Caddy, etc) for HTTPS and domain routing.

**Default Backend Credentials:**

- Email: `user@example.com`
- Password: `password123`

You can change these in the backend Dockerfile or with environment variables.

# Expense Tracker Frontend

Frontend implementation for the expense tracker assignment using Next.js App Router, TypeScript, MUI, and React Query. This client is designed to sit in front of the finished NestJS backend and present the API through a cleaner, more professional operational workspace.

## Implemented Features

### Transactions Workspace
- `/transactions` dashboard with a polished summary hero
- Server-driven pagination with 10 rows by default
- Server-driven sorting for `date`, `amount`, and `createdAt`
- Filtering by transaction type, category, date range, and amount range
- Quick filter on the visible page for fast operator scanning
- Row click opens a detail drawer with the full transaction record
- Loading indicators, empty states, and API error alerts

### Create Transaction
- `/transactions/new` route for creating income or expense transactions
- Category dropdown populated from the backend
- MUI date picker and typed payload formatting
- Frontend validation before submission
- React Query mutation with automatic dashboard refresh

### Budget + Reporting Enhancements
- Summary cards powered by `GET /transactions/summary/report`
- Budget watchlist powered by `GET /budgets` and `GET /budgets/:id/usage`
- Visual budget health indicators with progress bars and over-budget states

### Architecture Choices
- Next.js route handlers under `/api/*` proxy requests to the backend service
- Shared typed API client for browser components
- Zustand store for transaction table filters and view state
- Central formatting and form-validation helpers to keep components lean

## Environment

Create a local environment file from the example and point it to the backend:

```bash
BACKEND_API_URL=http://localhost:3000
```

The frontend calls local Next.js routes such as `/api/transactions`, and those routes proxy to the NestJS backend URL above.

For Docker Compose, the frontend container must target the backend service name on the Docker network:

```bash
BACKEND_API_URL=http://qashio-api:3000
```

## Run Locally

```bash
npm install
npm run dev
```

If your backend also runs on port `3000`, start the frontend on a different port:

```bash
npm run dev -- --port 3001
```

## Test Commands

```bash
npm run test
npm run build
```


## API Documentation

The backend API documentation (Swagger UI) is available at:

- http://72.62.48.101:3000/docs

Use this to explore, test, and understand all available API endpoints.

## Notes

- This frontend assumes the backend already exposes the assignment endpoints for transactions, categories, budgets, and summary reporting.
- The API client includes small normalization helpers so the UI remains stable if the backend wraps pagination metadata inside a `pagination` object.
- The visual design intentionally goes beyond the base assignment with a stronger dashboard presentation, responsive layout, and budget monitoring section.
- In Docker, `localhost` inside the frontend container refers to the frontend container itself, not the NestJS API. Use the Compose service name `qashio-api` for backend proxying.
