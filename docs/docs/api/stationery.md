# Stationery

Base path: `/api/v1/stationery`

All endpoints require `authenticate`. Category checks use `["stationery", "admin"]`
unless noted as admin-only. Note: `/available-products` currently checks the
`animal-feeding`/`admin` categories (see `stationery.routes.js`).

## POST /products

Multipart form fields: `name`, `description`, `quantity`, `price`, plus `image`.

```bash
curl -X POST http://localhost:4100/api/v1/stationery/products \
  -H "Authorization: Bearer $TOKEN" \
  -F name="A4 Paper" \
  -F description="80gsm ream" \
  -F quantity=200 \
  -F price=12000 \
  -F image=@./paper.jpg
```

Response (201) returns the created product document.

## GET /products

```sh
curl  http://localhost:4100/api/v1/stationery/products \
  -H "Authorization: Bearer $TOKEN"
```

## GET /products/search

Query params: `name`, `description`, `minPrice`, `maxPrice`.

```sh
curl  http://localhost:4100/api/v1/stationery/products?name="productName" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /products/:id

```sh
curl  http://localhost:4100/api/v1/stationery/products/:id \
  -H "Authorization: Bearer $TOKEN"
```

## PUT /products/:id

```json
{ "name": "A4 Paper Premium", "price": 13500 }
```

```sh
curl  -X PUT http://localhost:4100/api/v1/stationery/products/:id \
  -H "Authorization: Bearer $TOKEN"
  -d
```

## DELETE /products/:id

```sh
curl  -X DELETE http://localhost:4100/api/v1/stationery/products/:id \
  -H "Authorization: Bearer $TOKEN"
```

## POST /orders

```json
{ "productId": "<id>", "productName": "A4 Paper", "quantity": 3 }
```

```sh
curl  -X DELETE http://localhost:4100/api/v1/stationery/orders \
  -H "Authorization: Bearer $TOKEN"
```

## GET /orders

```sh
curl  http://localhost:4100/api/v1/stationery/orders \
  -H "Authorization: Bearer $TOKEN"
```

## GET /orders/search

Query params: `orderId`, `status`, `userId`.

## GET /orders/:id

```sh
curl  http://localhost:4100/api/v1/stationery/orders/:id \
  -H "Authorization: Bearer $TOKEN"
```

## PUT /orders/:id

```sh
curl  http://localhost:4100/api/v1/stationery/orders/:id \
  -H "Authorization: Bearer $TOKEN"
```

## DELETE /orders/:id

## GET /available-products

## GET /revenue

## GET /total-orders

## GET /reports

```bash
curl "http://localhost:4100/api/v1/stationery/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o stationery-report.pdf
```
