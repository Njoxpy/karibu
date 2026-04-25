# Godown (Warehouse)

Base path: `/api/v1/godown`

All endpoints require `authenticate`. Category checks use `["godown", "admin"]`
unless noted as admin-only.

## Endpoints

| Method | Path                       | Category    | Permission           | Description                              |
|--------|----------------------------|-------------|----------------------|------------------------------------------|
| POST   | `/products`                | admin       | `createProduct`      | Create a product.                        |
| POST   | `/products/bulk-upload`    | admin       | `createProduct`      | Bulk-create products from `.xlsx`.       |
| GET    | `/products`                | godown, admin |                    | List products.                           |
| GET    | `/products/:id`            | godown, admin |                    | Get product by id.                       |
| PUT    | `/products/:id`            | admin       | `updateProduct`      | Update a product.                        |
| DELETE | `/products/:id`            | admin       | `deleteProduct`      | Delete a product.                        |
| GET    | `/available-products`      | godown, admin | `createOrder`      | Products available for ordering.         |
| POST   | `/orders`                  | godown, admin |                    | Create an order.                         |
| GET    | `/orders`                  | godown, admin |                    | List orders.                             |
| GET    | `/orders/:id`              | godown, admin |                    | Get order by id.                         |
| PUT    | `/orders/:id`              | admin       | `updateOrder`        | Update an order.                         |
| DELETE | `/orders/:id`              | admin       | `deleteOrder`        | Delete an order.                         |
| POST   | `/inventory-movement`      | admin       | `transferInventory`  | Transfer stock between locations.        |
| GET    | `/movement-logs`           | admin       |                      | List inventory movement logs.            |
| GET    | `/movement-logs/:id`       | admin       |                      | Get a movement log by id.                |
| PUT    | `/movement-logs/:id`       | admin       |                      | Update a movement log.                   |
| DELETE | `/movement-logs/:id`       | admin       |                      | Delete a movement log.                   |
| GET    | `/revenue`                 | admin       |                      | Revenue by `?period=day|week|month`.     |
| GET    | `/total-orders`            | admin       |                      | Total cost by `?filter=...`.             |
| GET    | `/reports`                 | admin       |                      | PDF report by `?startDate&endDate`.      |

## POST /products

```json
{
  "name": "Cement",
  "description": "50kg bag",
  "quantity": 200,
  "price": 18000,
  "location": "Main godown",
  "condition": "new"
}
```

```bash
curl -X POST http://localhost:4000/api/v1/godown/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Cement","description":"50kg bag","quantity":200,"price":18000,"location":"Main godown"}'
```

## POST /products/bulk-upload

Multipart form with a single `file` field referencing an `.xlsx` workbook.
Required columns per row: `name`, `price`, `quantity`, `location`,
`description`. Optional: `condition` (defaults to `new`).

```bash
curl -X POST http://localhost:4000/api/v1/godown/products/bulk-upload \
  -H "Authorization: Bearer $TOKEN" \
  -F file=@./products.xlsx
```

Response (201):

```json
{ "message": "Products uploaded successfully", "products": 42 }
```

Validation failures return `400` with a `errors` array of `{ row, errors[] }`.

## GET /products

## GET /products/:id

## PUT /products/:id

## DELETE /products/:id

## POST /orders

```json
{
  "productId": "<id>",
  "productName": "Cement",
  "quantity": 5
}
```

## GET /orders

## GET /orders/:id

## PUT /orders/:id

## DELETE /orders/:id

## POST /inventory-movement

Transfer inventory between godown locations or to another module.

```json
{
  "productId": "<id>",
  "fromLocation": "Main godown",
  "toLocation": "Branch A",
  "quantity": 10,
  "reason": "Restock"
}
```

## GET /movement-logs

## GET /movement-logs/:id

## PUT /movement-logs/:id

```json
{ "reason": "Adjusted note" }
```

## DELETE /movement-logs/:id

## GET /available-products

## GET /revenue

## GET /total-orders

## GET /reports

```bash
curl "http://localhost:4000/api/v1/godown/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o godown-report.pdf
```
