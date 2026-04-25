# Animal Feeding

Base path: `/api/v1/animal-feeding`

All endpoints require `authenticate`. Category checks use `["animal-feeding", "admin"]`
unless noted as admin-only.

## Endpoints

| Method | Path                  | Category    | Permission        | Description                         |
|--------|-----------------------|-------------|-------------------|-------------------------------------|
| GET    | `/products`           | animal-feeding, admin |          | List products.                      |
| GET    | `/products/search`    | animal-feeding, admin |          | Search products.                    |
| GET    | `/products/:id`       | animal-feeding, admin |          | Get product by id.                  |
| POST   | `/products`           | admin       | `createProduct`   | Create a product (multipart/form).  |
| PUT    | `/products/:id`       | admin       | `updateProduct`   | Update a product.                   |
| DELETE | `/products/:id`       | admin       | `deleteProduct`   | Delete a product.                   |
| GET    | `/orders`             | animal-feeding, admin |          | List orders.                        |
| GET    | `/orders/search`      | animal-feeding, admin |          | Search orders.                      |
| GET    | `/orders/:id`         | animal-feeding, admin |          | Get order by id.                    |
| POST   | `/orders`             | animal-feeding, admin |          | Create an order.                    |
| PUT    | `/orders/:id`         | admin       | `updateOrder`     | Update an order.                    |
| DELETE | `/orders/:id`         | admin       | `deleteOrder`     | Delete an order.                    |
| GET    | `/available-products` | animal-feeding, admin |          | Products with quantity > 0.         |
| GET    | `/revenue`            | admin       |                   | Revenue by `?period=day|week|month`.|
| GET    | `/total-orders`       | admin       |                   | Total cost by `?filter=day|week|month`. |
| GET    | `/reports`            | admin       |                   | PDF report by `?startDate&endDate`. |

## POST /products

Multipart form fields: `name`, `description`, `quantity`, `nutrients`, `price`,
plus `image` (file).

```bash
curl -X POST http://localhost:4000/api/v1/animal-feeding/products \
  -H "Authorization: Bearer $TOKEN" \
  -F name=lezod \
  -F description="chakula cha ngombe" \
  -F quantity=20 \
  -F nutrients=vitamin \
  -F price=50000 \
  -F image=@./feed.jpg
```

Response (201):

```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "69e7beee9e15259fba95973d",
    "name": "lezod",
    "description": "chakula cha ngombe",
    "quantity": 20,
    "nutrients": "vitamin",
    "price": 50000,
    "image": "/uploads/image-1776795374292-8855409.jpg",
    "userId": "69e76562713885bf5dbbe900",
    "total": 1000000,
    "createdAt": "2026-04-21T18:16:14.355Z",
    "updatedAt": "2026-04-21T18:16:14.355Z"
  }
}
```

## GET /products

```bash
curl http://localhost:4000/api/v1/animal-feeding/products \
  -H "Authorization: Bearer $TOKEN"
```

## GET /products/search

Query params: `name`, `description`, `minPrice`, `maxPrice`.

```bash
curl "http://localhost:4000/api/v1/animal-feeding/products/search?name=milk" \
  -H "Authorization: Bearer $TOKEN"
```

## GET /products/:id

```bash
curl http://localhost:4000/api/v1/animal-feeding/products/<id> \
  -H "Authorization: Bearer $TOKEN"
```

## PUT /products/:id

Request body (any subset):

```json
{ "name": "new name", "quantity": 1000, "price": 233 }
```

## DELETE /products/:id

```bash
curl -X DELETE http://localhost:4000/api/v1/animal-feeding/products/<id> \
  -H "Authorization: Bearer $TOKEN"
```

## POST /orders

```json
{
  "productId": "69e7beee9e15259fba95973d",
  "productName": "lezod",
  "quantity": 1
}
```

Response (201):

```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "69e7c1327a501a5133538ebf",
    "productName": "lezod",
    "productId": "69e7beee9e15259fba95973d",
    "quantity": 1,
    "price": 50000,
    "total": 50000,
    "userId": "69e76562713885bf5dbbe900",
    "orderId": "ORDER-ANIMAL-FEEDING-1776795954751-2252"
  }
}
```

## GET /orders

```bash
curl http://localhost:4000/api/v1/animal-feeding/orders \
  -H "Authorization: Bearer $TOKEN"
```

## GET /orders/search

Query params: `orderId`, `status`, `userId`.

## GET /orders/:id

## PUT /orders/:id

```json
{ "quantity": 2 }
```

## DELETE /orders/:id

## GET /available-products

Returns only products with `quantity > 0`.

## GET /revenue

```bash
curl "http://localhost:4000/api/v1/animal-feeding/revenue?period=day" \
  -H "Authorization: Bearer $TOKEN"
```

```json
{
  "message": "Day revenue fetched successfully.",
  "revenue": 100000,
  "period": "day",
  "startDate": "2026-04-20T21:00:00.000Z",
  "endDate": "2026-04-21T20:59:59.999Z"
}
```

## GET /total-orders

```bash
curl "http://localhost:4000/api/v1/animal-feeding/total-orders?filter=week" \
  -H "Authorization: Bearer $TOKEN"
```

```json
{ "totalCost": 100000 }
```

## GET /reports

Returns a PDF stream.

```bash
curl "http://localhost:4000/api/v1/animal-feeding/reports?startDate=2025-01-01&endDate=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -o animal-feeding-report.pdf
```
