# Inventory Tracking System – Stage 1

This is Stage 1 of a scalable Inventory Tracking System designed for kiryana stores. It provides the core functionality to track stock-in, sales, and manual stock removals using a local SQLite database and a modular Express backend.

## - Design Decisions:

- **Modular Architecture:**
  The backend is structured into separate layers: models, services, controllers, and routes, which improves code readability, maintainability, and scalability.

- **SQLite for Local Storage:**
  SQLite was chosen to keep things lightweight and file-based, which is ideal for single-store setups and CLI or local API testing.

- **SIMPLE API:**
  Use SIMPLE API in stage one that will use HTTP interfaces. This reduces technical debt and transition friction.

- **Sequelize ORM:**
  Sequelize abstracts SQL complexities, enabling flexible schema evolution as we transition to PostgreSQL in future stages.

# Assumptions:

- The system is built for a single kiryana store in Stage 1.

- There are no users or authentication in this version.

- A product’s quantity is directly updated with each stock movement.

- Time-based filtering or reporting is not required yet.

- Operations are assumed to be sequential (i.e., no concurrent updates).

# API Design:

- **No authentication in Stage 1**
  ## - Product Endpoints
  | Method | Endpoint  | Description          |
  | :----- | :-------- | :------------------- |
  | POST   | /products | Create a new product |
  | GET    | /products | Get all products     |

**Request Example (POST /products):**

```
{
"name": "Pepsi 1.5L",
"sku": "PEPSI-1.5L",
"price": 180
}
```

## Stock Movement Endpoints

| Method | Endpoint      | Description           |
| :----- | :------------ | :-------------------- |
| POST   | /stock/in     | Stock in a product    |
| POST   | /stock/sell   | Record a product sale |
| POST   | /stock/remove | Manually remove stock |

**Request Example (POST /stock/in):**

```
{
"productId": 1,
"quantity": 10
}
```

# Evolution Rationale (v1 → v3):

➤ **Stage 1:** Single Store: `(Current Stage)`

- Local SQLite for persistence
- No user auth
- Simple product/stock APIs

➤ **Stage 2:** 500+ Stores: `(Next milestone)`

- Transition to PostgreSQL
- Add multi-store support and central product catalog
- Introduce auth, throttling, and reporting by store/date

➤ **Stage 3:** Thousands of Stores: `(Final stage)`

- Implement horizontal scalability
- Enable event-driven stock updates
- Add read/write separation and Redis caching
- Enforce advanced rate-limiting with Redis

# File Structure:

```
── src/
├── config/ # DB setup (SQLite)
├── models/ # Sequelize models
├── services/ # Business logic
├── controllers/ # API handlers
├── routes/ # API routes
└── server.js # Entry point
```

# Getting Started:

```
> <! Navigate to the project >

cd KIRYANA_BAZAR_PROJECT

> <! Install dependencies>

npm install

> <! Start the server>

node src/server.js
```

# Testing API:

Use Postman, Thunder Client to test endpoints.
