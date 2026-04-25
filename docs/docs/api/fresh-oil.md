# Fresh Oil

Base path: `/api/v1/fresh-oil`

All endpoints require `authenticate`. Category checks use `["fresh-oil", "admin"]`
unless noted as admin-only.

## Endpoints

| Method | Path                  | Category    | Permission        | Description                         |
|--------|-----------------------|-------------|-------------------|-------------------------------------|
| GET    | `/products`           | fresh-oil, admin |             | List products (paginated).          |
| GET    | `/products/search`    | fresh-oil, admin |             | Search products.                    |
| GET    | `/products/:id`       | fresh-oil, admin |             | Get product by id.                  |
| POST   | `/products`           | admin       | `createProduct`   | Create a product (multipart/form).  |
| PUT    | `/products/:id`       | admin       | `updateProduct`   | Update a product.                   |
| DELETE | `/products/:id`       | admin       | `deleteProduct`   | Delete a product.                   |
| GET    | `/orders`             | fresh-oil, admin |             | List orders (paginated).            |
| GET    | `/orders/search`      | fresh-oil, admin |             | Search orders.                      |
| GET    | `/orders/:id`         | fresh-oil, admin |             | Get order by id.                    |
| POST   | `/orders`             | fresh-oil, admin |             | Create an order.                    |
| PUT    | `/orders/:id`         | admin       | `updateOrder`     | Update an order.                    |
| DELETE | `/orders/:id`         | admin       | `deleteOrder`     | Delete an order.                    |
| GET    | `/available-products` | fresh-oil, admin |             | Products with stock available.      |
| GET    | `/revenue`            | admin       |                   | Revenue by `?period=day|week|month`.|
| GET    | `/total-orders`       | admin       |                   | Total cost by `?filter=...`.        |
| GET    | `/orders-count`       | admin       |                   | Total order count.                  |
| GET    | `/products-count`     | admin       |                   | Aggregated product quantity across all modules. |
| GET    | `/sales-total`        | admin       |                   | Aggregated sales total across all modules. |
| GET    | `/reports`            | admin       |                   | PDF report by `?startDate&endDate`. |

Pagination: `?page=1&limit=10` (defaults applied by middleware).

## POST /products

Multipart form fields: `name`, `description`, `quantity`, `price`, plus `image` (file).

```bash
curl -X POST http://localhost:4000/api/v1/fresh-oil/products \
  -H "Authorization: Bearer $TOKEN" \
  -F name=mnyonyo \
  -F description="just description" \
  -F quantity=120 \
  -F price=23000 \
  -F image=@./oil.jpg
```

Response (201):

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "69ea4e5b5fb2f565b07b25da",
    "name": "mnyonyo",
    "description": "just description",
    "quantity": 120,
    "price": 23000,
    "image": "/uploads/image-1776963163291-608551489.jpg",
    "userId": "69e76562713885bf5dbbe900",
    "total": 2760000
  }
}
```

## GET /products

```bash
curl "http://localhost:4000/api/v1/fresh-oil/products?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /products/search

Query params: `name`, `description`, `minPrice`, `maxPrice`.

## GET /products/:id

## PUT /products/:id

```json
{ "name": "virgin oil v3", "quantity": 14, "price": 3400 }
```

## DELETE /products/:id

## POST /orders

```json
{
  "productId": "69ea4e965fb2f565b07b25de",
  "productName": "mnyonyo",
  "quantity": 4
}
```

## GET /orders

Paginated. Returns orders with populated `productId` reference.

## GET /orders/search

Query params: `orderId`, `status`, `userId`.

## GET /orders/:id

## PUT /orders/:id

```json
{ "quantity": 12 }
```

## DELETE /orders/:id

## GET /available-products

## GET /revenue

```bash
curl "http://localhost:4000/api/v1/fresh-oil/revenue?period=day" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /total-orders

```bash
curl "http://localhost:4000/api/v1/fresh-oil/total-orders?filter=week" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /orders-count

```json
{ "totalCount": 3 }
```

## GET /products-count

Aggregates product quantities across all modules (fresh-oil, animal-feeding,
godown, hardware, stationery).

```json
{ "totalProducts": 1550 }
```

## GET /sales-total

Aggregates sales totals across all modules.

```json
{ "totalSales": 215000 }
```

## GET /reports

```bash
curl "http://localhost:4000/api/v1/fresh-oil/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o fresh-oil-report.pdf
```
