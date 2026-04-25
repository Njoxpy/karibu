# Printing

Base path: `/api/v1/printing`

The printing module is order-only; jobs are created without a backing product
catalogue. All endpoints require `authenticate`. Category checks use
`["printing", "admin"]` unless noted as admin-only.

## Endpoints

| Method | Path                  | Category    | Permission           | Description                         |
|--------|-----------------------|-------------|----------------------|-------------------------------------|
| POST   | `/orders`             | printing, admin |                  | Create a printing order.            |
| GET    | `/orders`             | printing, admin |                  | List printing orders.               |
| GET    | `/orders/:id`         | printing, admin |                  | Get an order by id.                 |
| PUT    | `/orders/:id`         | admin       | `updateOrder`        | Update an order.                    |
| DELETE | `/orders/:id`         | admin       | `deleteOrder`        | Delete an order.                    |
| PUT    | `/orders/:id/status`  | printing, admin | `updateOrderStatus` | Update order status (e.g. complete).|
| GET    | `/revenue`            | admin       |                      | Revenue by `?period=day|week|month`.|
| GET    | `/total-orders`       | admin       |                      | Total cost by `?filter=...`.        |
| GET    | `/reports`            | admin       |                      | PDF report by `?startDate&endDate`. |

## POST /orders

The body is validated by the `validatePrintingOrder` middleware.

```json
{
  "jobName": "Business cards - Acme",
  "description": "Matte 350gsm, 100 pcs",
  "quantity": 100,
  "price": 80000,
  "customerName": "Acme",
  "customerPhone": "+255700000000"
}
```

Response (201):

```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "...",
    "jobName": "Business cards - Acme",
    "quantity": 100,
    "price": 80000,
    "total": 8000000,
    "status": "pending",
    "orderId": "ORDER-PRINTING-..."
  }
}
```

## GET /orders

## GET /orders/:id

## PUT /orders/:id

```json
{ "quantity": 150, "price": 90000 }
```

## DELETE /orders/:id

## PUT /orders/:id/status

```json
{ "status": "completed" }
```

## GET /revenue

```bash
curl "http://localhost:4000/api/v1/printing/revenue?period=day" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /total-orders

## GET /reports

```bash
curl "http://localhost:4000/api/v1/printing/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o printing-report.pdf
```
