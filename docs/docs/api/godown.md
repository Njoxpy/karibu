# Godown (Warehouse)

Base path: `/api/v1/godown`

All endpoints require `authenticate`. Category checks use `["godown", "admin"]`
unless noted as admin-only.

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
curl -X POST http://localhost:4100//api/v1/godown/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Cement","description":"50kg bag","quantity":200,"price":18000,"location":"Main godown"}'
```

## POST /products/bulk-upload

Multipart form with a single `file` field referencing an `.xlsx` workbook.
Required columns per row: `name`, `price`, `quantity`, `location`,
`description`. Optional: `condition` (defaults to `new`).

```bash
curl -X POST http://localhost:4100//api/v1/godown/products/bulk-upload \
  -H "Authorization: Bearer $TOKEN" \
  -F file=@./products.xlsx
```

Response (201):

```json
{ "message": "Products uploaded successfully", "products": 42 }
```

Validation failures return `400` with a `errors` array of `{ row, errors[] }`.

## GET /products

```bash
curl "http://localhost:4100/api/v1/godown/products" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /products/:id

```bash
curl "http://localhost:4100/api/v1/godown/products/:id" \
  -H "Authorization: Bearer $TOKEN"
```

## PUT /products/:id

```bash
curl -X PUT "http://localhost:4100/api/v1/godown/products/:id" \
  -H "Authorization: Bearer $TOKEN"
```

## DELETE /products/:id

```bash
curl -X DELETE "http://localhost:4100/api/v1/godown/products/:id" \
  -H "Authorization: Bearer $TOKEN"
```

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
curl "http://localhost:4100//api/v1/godown/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o godown-report.pdf
```
