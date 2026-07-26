# API Endpoints

## Document Information

| Item | Value |
|------|-------|
| Project | StreamForge |
| Version | 1.0 |
| Author | Uzair |
| Status | Draft |
| Created | 2026-07-26 |
| Last Updated | 2026-07-26 |

---

# Purpose

This document defines the REST API endpoints provided by StreamForge.

It describes available resources, HTTP methods, request formats, and expected responses.

---

# API Base URL



/api/v1



---

# Customer APIs

## Create Customer

Endpoint:



POST /customers



Purpose:

Creates a new customer.

Request:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123456789"
}


Response:

json
{
  "success": true,
  "message": "Customer created",
  "data": {
    "customerId": 1
  }
}


---

## Get Customers

Endpoint:


GET /customers


Purpose:

Returns all customers.

---

## Get Customer By ID

Endpoint:


GET /customers/:id


Purpose:

Returns customer details.

---

# Product APIs

## Create Product

Endpoint:


POST /products


Purpose:

Creates a new product.

Request:

json
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 1200
}


---

## Get Products

Endpoint:


GET /products


Purpose:

Returns available products.

---

## Get Product By ID

Endpoint:


GET /products/:id


Purpose:

Returns product details.

---

# Order APIs

## Create Order

Endpoint:


POST /orders


Purpose:

Creates a customer order.

Request:

json
{
  "customerId": 1,
  "items": [
    {
      "productId": 10,
      "quantity": 2
    }
  ]
}


Process:

1. Validate customer.
2. Validate product availability.
3. Store order.
4. Publish OrderCreated event.

---

## Get Orders

Endpoint:


GET /orders


Purpose:

Returns order history.

---

## Get Order By ID

Endpoint:


GET /orders/:id


Purpose:

Returns order details.

---

# Payment APIs

## Create Payment

Endpoint:


POST /payments


Purpose:

Creates payment transaction.

---

## Get Payment Status

Endpoint:


GET /payments/:orderId


Purpose:

Returns payment information for an order.

---

# Inventory APIs

## Get Inventory

Endpoint:


GET /inventory


Purpose:

Returns current inventory status.

---

## Update Inventory

Endpoint:


PUT /inventory/:productId


Purpose:

Updates product stock.

Request:

json
{
  "quantity": 100
}


---

# Authentication APIs

## Login

Endpoint:


POST /auth/login


Purpose:

Authenticates users.

Request:

json
{
  "email": "user@example.com",
  "password": "password"
}


Response:

json
{
  "token": "jwt-token"
}


---

# Health Check

Endpoint:


GET /health


Purpose:

Checks API availability.

Response:

json
{
  "status": "healthy"
}


---

# API Error Handling

All errors follow a standard format:

json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description"
  }
}


---

# Future Improvements

Possible improvements:

* OpenAPI specification.
* API gateway.
* Rate limiting.
* GraphQL support.
* API analytics.

