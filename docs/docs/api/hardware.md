# Hardware

Base path: `/api/v1/hardware`

All endpoints require `authenticate`. Category checks use `["hardware", "admin"]`
unless noted as admin-only.

## Endpoints

| Method | Path                  | Category    | Permission        | Description                         |
|--------|-----------------------|-------------|-------------------|-------------------------------------|
| GET    | `/products`           | hardware, admin |              | List products.                      |
| GET    | `/products/:id`       | hardware, admin |              | Get product by id.                  |
| POST   | `/products`           | admin       | `createProduct`   | Create a product (multipart/form).  |
| PUT    | `/products/:id`       | admin       | `updateProduct`   | Update a product.                   |
| DELETE | `/products/:id`       | admin       | `deleteProduct`   | Delete a product.                   |
| GET    | `/orders`             | hardware, admin |              | List orders.                        |
| GET    | `/orders/:id`         | hardware, admin |              | Get order by id.                    |
| POST   | `/orders`             | hardware, admin |              | Create an order.                    |
| PUT    | `/orders/:id`         | admin       | `updateOrder`     | Update an order.                    |
| DELETE | `/orders/:id`         | admin       | `deleteOrder`     | Delete an order.                    |
| GET    | `/available-products` | hardware, admin | `createOrder`  | Available products for orders.      |
| GET    | `/revenue`            | admin       |                   | Revenue by `?period=day|week|month`.|
| GET    | `/total-orders`       | admin       |                   | Total cost by `?filter=...`.        |
| GET    | `/reports`            | admin       |                   | PDF report by `?startDate&endDate`. |

## POST /products

Multipart form fields: `name`, `description`, `quantity`, `price`, plus `image`.

```bash
curl -X POST http://localhost:4000/api/v1/hardware/products \
  -H "Authorization: Bearer $TOKEN" \
  -F name=Hammer \
  -F description="Steel claw hammer" \
  -F quantity=50 \
  -F price=15000 \
  -F image=@./hammer.jpg
```

Response (201):

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "...",
    "name": "Hammer",
    "description": "Steel claw hammer",
    "quantity": 50,
    "price": 15000,
    "image": "/uploads/image-...jpg",
    "userId": "...",
    "total": 750000
  }
}
```

## GET /products

## GET /products/:id

## PUT /products/:id

```json
{ "name": "Heavy Hammer", "price": 20000 }
```

## DELETE /products/:id

## POST /orders

```json
{ "productId": "<id>", "productName": "Hammer", "quantity": 2 }
```

## GET /orders

## GET /orders/:id

## PUT /orders/:id

## DELETE /orders/:id

## GET /available-products

## GET /revenue

## GET /total-orders

## GET /reports

```bash
curl "http://localhost:4000/api/v1/hardware/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o hardware-report.pdf
```
