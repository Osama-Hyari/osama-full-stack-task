FROM node:22.8.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- production image ----
FROM node:22.8.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Set default email/password for auth
ENV DEFAULT_EMAIL=user@example.com
ENV DEFAULT_PASSWORD=password123

CMD ["node", "dist/main"]
