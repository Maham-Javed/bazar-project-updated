# Inventory Tracking System – Stage 2

This is Stage 2 of the Inventory Tracking System. It extends Stage 1 by introducing support for multiple stores, a centralized product catalog, authentication, request throttling, and reporting with PostgreSQL as the relational backend.

# Design Decisions:

### - PostgreSQL Database:

- Switched from SQLite to PostgreSQL for relational integrity, indexing, and scalability across multiple stores.

### - Centralized Product Catalog:

- Products are globally defined; each store tracks its own stock levels via stock movement records.

### - Modular Architecture:

- Maintains a clean separation of concerns (Models, Services, Controllers, Routes) to simplify testing and future upgrades.

### - Authentication (JWT):

- Basic token-based authentication protects the API endpoints and supports future role-based access.

### - Rate Limiting:

- Throttles requests to prevent abuse, using express-rate-limit.

### - Query Filtering:

- Enables filtering stock reports by store and date range.

# Assumptions:

- Each stock movement is atomic and affects a single product in a single store.

- A single user role exists (admin), and role-based permissions are out of scope for now.

- Stock quantity is not stored explicitly but is derived from stock movements.

- All APIs are used in trusted environments (e.g., internal apps).

- Each store’s transactions are handled independently.

# API Design:

### Auth Endpoints:

| Method | Endpoint        | Description              |
| :----- | :-------------- | :----------------------- |
| POST   | /api/auth/login | Admin login, returns JWT |

### Request:

```
{ "username": "admin", "password": "password" }
```

### Product Endpoints:

| Method | Endpoint      | Description      |
| :----- | :------------ | :--------------- |
| POST   | /api/products | Create a product |
| GET    | /api/products | Get all products |

### Stock Movement Endpoints:

| Method | Endpoint          | Description                                                  |
| :----- | :---------------- | :----------------------------------------------------------- |
| POST   | /api/stock        | Record stock-in, sale, or removal                            |
| GET    | /api/stock/report | Get stock report (filterable by storeId, startDate, endDate) |

### Request Example (POST /api/stock):

```
{
"productId": 1,
"storeId": 2,
"quantity": 5,
"type": "SALE"
}
```

# Entity Relationships:

- **Product:** Centralized product catalog

- **Store:** Each store is uniquely identified

- **StockMovement:** Tracks stock changes per product/store

# Evolution Rationale (v1 → v3):

## Stage 1 (Completed)

- Local single-store setup using SQLite

- Product + Stock Movement models only

- No authentication or multi-store logic

## Stage 2 (Current Stage)

- PostgreSQL + Sequelize for relational modeling

- REST APIs secured with JWT auth

- Added support for:

- Multi-store stock tracking

- Rate limiting

- Store/date-based reporting

- Structured for scalability

## Stage 3 (Next):

- Redis-based caching for product/report reads

- Asynchronous stock processing using BullMQ queue

- Read/write DB separation

- Advanced Redis-backed rate limiting

- Horizontal scalability (stateless Express server)

# File Structure Overview:

```
|--── src/
|  ├── config/ # DB config
|  ├── models/ # Sequelize models
|  ├── services/ # Business logic
|  ├── controllers/ # Route handlers
|  ├── routes/ # API routes
|  ├── middleware/ # Auth + throttling
|  └── server.js # Entry point
│── .env
│── package.json
```

# Getting Started

```
# 1. Set your PostgreSQL credentials in `.env`

PORT=5000
DB_NAME=inventory
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=mysecretkey

# 2. Install dependencies

cd KIRYANA_BAZAR_PROJECT
npm install

# 3. Start the server

node src/server.js
```

# Testing:

Use tools like Postman or Thunder Client to authenticate and test all routes.
