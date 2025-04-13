# Inventory Tracking System – Stage 3

This is Stage 3 of the Inventory Tracking System, extending Stages 1 and 2 by introducing scalable, distributed, and performance-optimized architecture. It supports thousands of stores, near real-time stock synchronization, and reliable, secure APIs backed by PostgreSQL and Redis.

# Design Decisions:

**- Modular & Stateless Architecture**

- The application is structured using modular patterns (controllers, services, routes, middleware).

- Stateless Express server allows for horizontal scalability across containers or server instances.

**- PostgreSQL with Read/Write Separation:**

- Two Sequelize instances simulate primary (write) and replica (read) databases.

- Future production-ready deployments can point `readDB` to read replicas (e.g., PostgreSQL streaming replicas or AWS RDS Read Replicas).

**- Asynchronous Processing with BullMQ:**

- Stock movements are queued using BullMQ and processed asynchronously by a background worker.

- This ensures high throughput and fault tolerance during stock updates.

**- Redis Caching:**

- Redis caches product and stock report data to reduce DB load and improve response times.

- Cache is automatically invalidated with a TTL (time-to-live) of 60 seconds.

**- Advanced Rate Limiting:**

- A Redis-backed token bucket strategy is implemented using `express-rate-limit` and `rate-limit-redis`.

- Protects the API from abuse and traffic spikes.

# Assumptions:

- A central product catalog exists across all stores.

- Stock movement types include `IN`, `SALE`, and `REMOVE`.

- Each stock movement affects only a single product in a specific store.

- Roles are not implemented beyond basic authentication; all users are considered trusted/internal.

- Asynchronous processing eventually reflects changes in stock, so some delay may be expected for consistency.

- Read/write DB separation is simulated; in production, a true replica system should be used.

# API Design:

**- Auth Endpoints:**

| Method | Endpoint        | Description              |
| :----- | :-------------- | :----------------------- |
| POST   | /api/auth/login | Admin login, returns JWT |

`Request`

```
{ "username": "admin", "password": "password" }
```

**- Product Endpoints:**

| Method | Endpoint      | Description           |
| :----- | :------------ | :-------------------- |
| POST   | /api/products | Create a new product  |
| GET    | /api/products | Retrieve all products |

**- Stock Movement Endpoints:**

| Method | Endpoint          | Description                               |
| :----- | :---------------- | :---------------------------------------- |
| POST   | /api/stock        | Enqueue a stock movement (IN/SALE/REMOVE) |
| GET    | /api/stock/report | Get report filtered by store/date         |

`POST Example`

```
{
"productId": 1,
"storeId": 2,
"quantity": 10,
"type": "IN"
}
```

`GET Example:`

```
GET /api/stock/report?storeId=1&startDate=2025-01-01&endDate=2025-01-31
```

# File Structure:

```
src/
├── config/
│ ├── database.js # Sequelize read/write config
│ ├── redis.js # Redis client
├── models/ # Sequelize models
├── services/ # Business logic
├── controllers/ # Route handlers
├── routes/ # API endpoints
├── middleware/ # Auth, cache, rate limiting
├── jobs/
│ └── stockJob.js # BullMQ queue logic
├── worker.js # Queue processor
└── server.js # API server entry point
```

# Evolution Rationale (v1 → v3):

## Stage 1: Single Store:

- Local SQLite file DB

- No authentication

- Basic REST endpoints for stock movements

## Stage 2: Multi-store Expansion:

- Switched to PostgreSQL

- Central product catalog

- JWT-based auth and basic rate limiting

- Reporting by store and date range

- Support for 500+ stores

## Stage 3: Scalable Architecture (Current Stage):

- Redis caching

- Event-driven updates (BullMQ)

- Read/Write DB separation

- Redis-backed advanced rate limiting

- Support for thousands of stores

- Horizontally scalable server architecture

# Running the System:

## Requirements:

- Node.js v14+

- PostgreSQL (with optional read replica)

- Redis

**- Setup:**

```
# 1. Clone the repo and cd into backend

npm install

# 2. Set environment variables

cp .env.example .env

# Fill in PostgreSQL + Redis credentials

# 3. Start the API server

node src/server.js

# 4. Start the background worker (in a separate terminal)

node worker.js
```

# Testing:

Use Postman and Thunder Client to test endpoints. Token is required for protected routes.
