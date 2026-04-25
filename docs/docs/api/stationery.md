# Stationery

Base path: `/api/v1/stationery`

All endpoints require `authenticate`. Category checks use `["stationery", "admin"]`
unless noted as admin-only. Note: `/available-products` currently checks the
`animal-feeding`/`admin` categories (see `stationery.routes.js`).

## Endpoints

| Method | Path                  | Category    | Permission        | Description                         |
|--------|-----------------------|-------------|-------------------|-------------------------------------|
| GET    | `/products`           | stationery, admin |            | List products.                      |
| GET    | `/products/search`    | stationery, admin |            | Search products.                    |
| GET    | `/products/:id`       | stationery, admin |            | Get product by id.                  |
| POST   | `/products`           | admin       | `createProduct`   | Create a product (multipart/form).  |
| PUT    | `/products/:id`       | admin       | `updateProduct`   | Update a product.                   |
| DELETE | `/products/:id`       | admin       | `deleteProduct`   | Delete a product.                   |
| GET    | `/orders`             | stationery, admin |            | List orders.                        |
| GET    | `/orders/search`      | stationery, admin |            | Search orders.                      |
| GET    | `/orders/:id`         | stationery, admin |            | Get order by id.                    |
| POST   | `/orders`             | stationery, admin |            | Create an order.                    |
| PUT    | `/orders/:id`         | admin       | `updateOrder`     | Update an order.                    |
| DELETE | `/orders/:id`         | admin       | `deleteOrder`     | Delete an order.                    |
| GET    | `/available-products` | animal-feeding, admin |        | Products available for ordering.    |
| GET    | `/revenue`            | admin       |                   | Revenue by `?period=day|week|month`.|
| GET    | `/total-orders`       | admin       |                   | Total cost by `?filter=...`.        |
| GET    | `/reports`            | admin       |                   | PDF report by `?startDate&endDate`. |

## POST /products

Multipart form fields: `name`, `description`, `quantity`, `price`, plus `image`.

```bash
curl -X POST http://localhost:4000/api/v1/stationery/products \
  -H "Authorization: Bearer $TOKEN" \
  -F name="A4 Paper" \
  -F description="80gsm ream" \
  -F quantity=200 \
  -F price=12000 \
  -F image=@./paper.jpg
```

Response (201) returns the created product document.

## GET /products

## GET /products/search

Query params: `name`, `description`, `minPrice`, `maxPrice`.

## GET /products/:id

## PUT /products/:id

```json
{ "name": "A4 Paper Premium", "price": 13500 }
```

## DELETE /products/:id

## POST /orders

```json
{ "productId": "<id>", "productName": "A4 Paper", "quantity": 3 }
```

## GET /orders

## GET /orders/search

Query params: `orderId`, `status`, `userId`.

## GET /orders/:id

## PUT /orders/:id

## DELETE /orders/:id

## GET /available-products

## GET /revenue

## GET /total-orders

## GET /reports

```bash
curl "http://localhost:4000/api/v1/stationery/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o stationery-report.pdf
```
