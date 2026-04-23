## Fresh OIl API doc


## Create

### Add product

- endpoint , request body, sample, response status, response body.
- This end point helps an admin to add a product into the store and requires authentication.

- Endpoint - `api/v1/fresh-oil/products` |

- request body:
```json
{
 "name": "lezod",
"description": "chakula cha ngombwe ambao wamezaliwa",
"quantity": 20,
"price": 50000,
"image": "/uploads/image-1776795374292-8855409.jpg",
"userId": "69e76562713885bf5dbbe900",
"nutrients": "vitamin",
}
```

- response body:

```json
{
    "message": "Product created successfully",
    "product": {
        "name": "mdanza",
        "description": "just description",
        "quantity": 120,
        "price": 23000,
        "image": "/uploads/image-1776963163291-608551489.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "total": 2760000,
        "_id": "69ea4e5b5fb2f565b07b25da",
        "createdAt": "2026-04-23T16:52:43.343Z",
        "updatedAt": "2026-04-23T16:52:43.343Z",
        "__v": 0
    }
}
```

### Create an order

- endpoint , request body, sample, response status, response body.
- This end point helps an user into the system to create an order based on the product which is available into the system.

- Endpoint - `http://localhost:4000/api/v1/fresh-oil/orders` |

- request body:
```json
{
    "productId": "69ea4e965fb2f565b07b25de",
    "productName" : "mnyonyo",
    "quantity": 4
}
```

- response body:

```json
{
    "message": "Order created successfully",
    "order": {
        "userId": "69e76562713885bf5dbbe900",
        "productName": "mnyonyo",
        "productId": "69ea4e965fb2f565b07b25de",
        "quantity": 4,
        "price": 23000,
        "total": 92000,
        "_id": "69ea4f075fb2f565b07b25e3",
        "orderId": "ORDER-FRESH-OIL-1776963335498-8405",
        "createdAt": "2026-04-23T16:55:35.499Z",
        "updatedAt": "2026-04-23T16:55:35.499Z",
        "__v": 0
    }
}
```


## Read

## Get products

- endpoint: `http://localhost:4000/api/v1/fresh-oil/products/`

- response: 

```json
[
     {
        "_id": "69ea4e965fb2f565b07b25de",
        "name": "mnyonyo",
        "description": "just description",
        "quantity": 116,
        "price": 23000,
        "image": "/uploads/image-1776963222673-696288337.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "total": 2668000,
        "createdAt": "2026-04-23T16:53:42.713Z",
        "updatedAt": "2026-04-23T16:55:35.592Z",
        "__v": 0
    }
]
```

## Saerch for products

- endpoint: `http://localhost:4000/api/v1/fresh-oil/products/search?name=mnyonyo`

- response: 

```json
[
    {
        "_id": "69ea4e965fb2f565b07b25de",
        "name": "mnyonyo",
        "description": "just description",
        "quantity": 116,
        "price": 23000,
        "image": "/uploads/image-1776963222673-696288337.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "total": 2668000,
        "createdAt": "2026-04-23T16:53:42.713Z",
        "updatedAt": "2026-04-23T16:55:35.592Z",
        "__v": 0
    }
]
```


## get product

- endpoint: `http://localhost:4000/API/v1/fresh-oil/products/:id`
`http://localhost:4000/api/v1/fresh-oil/products/69ea4db7169f2fe4afe65792`

- response: 

```json
{
    "_id": "69ea4db7169f2fe4afe65792",
    "name": "virgin oil",
    "description": "just description",
    "quantity": 120,
    "price": 23000,
    "image": "/uploads/image-1776962999357-125377639.jpg",
    "userId": "69e76562713885bf5dbbe900",
    "total": 2760000,
    "createdAt": "2026-04-23T16:49:59.427Z",
    "updatedAt": "2026-04-23T16:49:59.427Z",
    "__v": 0
}
```

## get orders

- endpoint: `http://localhost:4000/API/v1/fresh-oil/orders`

- response: 

```json
[
    {
        "_id": "69ea4f075fb2f565b07b25e3",
        "userId": "69e76562713885bf5dbbe900",
        "productName": "mnyonyo",
        "productId": {
            "_id": "69ea4e965fb2f565b07b25de",
            "name": "mnyonyo"
        },
        "quantity": 4,
        "price": 23000,
        "total": 92000,
        "orderId": "ORDER-FRESH-OIL-1776963335498-8405",
        "createdAt": "2026-04-23T16:55:35.499Z",
        "updatedAt": "2026-04-23T16:55:35.499Z",
        "__v": 0
    }
]
```

## Search Order

- endpoint: `http://localhost:4000/API/v1/fresh-oil/orders/search`

`http://localhost:4000/API/v1/fresh-oil/orders/search?"orderId=ORDER-FRESH-OIL-1776964623743-9090"`
- response body: 

```json
[
    {
        "_id": "69ea4f075fb2f565b07b25e3",
        "userId": "69e76562713885bf5dbbe900",
        "productName": "mnyonyo",
        "productId": "69ea4e965fb2f565b07b25de",
        "quantity": 4,
        "price": 23000,
        "total": 92000,
        "orderId": "ORDER-FRESH-OIL-1776963335498-8405",
        "createdAt": "2026-04-23T16:55:35.499Z",
        "updatedAt": "2026-04-23T16:55:35.499Z",
        "__v": 0
    }
]
```

## get order

- endpoint: `http://localhost:4000/API/v1/fresh-oil/orders/:id`

`http://localhost:4000/api/v1/fresh-oil/orders/69ea540fa9385304bfbbc884`

- response: 

```json
{
    "_id": "69ea540fa9385304bfbbc884",
    "userId": "69e76562713885bf5dbbe900",
    "productName": "mdanza",
    "productId": "69ea4e5b5fb2f565b07b25da",
    "quantity": 1,
    "price": 23000,
    "total": 23000,
    "orderId": "ORDER-FRESH-OIL-1776964623743-9090",
    "createdAt": "2026-04-23T17:17:03.748Z",
    "updatedAt": "2026-04-23T17:17:03.748Z",
    "__v": 0
}
```

## get available products

- endpoint: `http://localhost:4000/API/v1/fresh-oil/available-products`

- response: 

```json
{
    "message": "Available products fetched successfully.",
    "products": [
        {
            "_id": "69ea4db7169f2fe4afe65792",
            "name": "virgin oil",
            "description": "just description",
            "quantity": 120,
            "price": 23000,
            "image": "/uploads/image-1776962999357-125377639.jpg",
            "userId": "69e76562713885bf5dbbe900",
            "total": 2760000,
            "createdAt": "2026-04-23T16:49:59.427Z",
            "updatedAt": "2026-04-23T16:49:59.427Z",
            "__v": 0
        }
    ]
}
```

## get revenue

- endpoint: `http://localhost:4000/api/v1/fresh-oil/revenue?period=day`

- response body:

```json
{
    "message": "Day revenue fetched successfully.",
    "revenue": 92000,
    "period": "day",
    "startDate": "2026-04-22T21:00:00.000Z",
    "endDate": "2026-04-23T20:59:59.999Z"
}
```

## total orders

- endpoint: `http://localhost:4000/api/v1/fresh-oil/total-orders?filter=week`

- response body:

```json
{
    "totalCost": 115000
}
```

## Report 

- This endpoint returns the report into the pdf format.

- endpoint: `http://localhost:4000/api/v1/fresh-oil/reports?startDate=2025-01-01&endDate=2026-10-31`

## Orders Count

- endpoint: `http://localhost:4000/api/v1/fresh-oil/orders-count`
- response body: 
```json
{
    "totalCount": 3
}
```

## Products Count

- endpoint: `http://localhost:4000/api/v1/fresh-oil/products-count`
- response body: 
```json
{"totalProducts":1550}
```

## Sales Total

- endpoint: `http://localhost:4000/api/v1/fresh-oil/sales-total`
- response body: 
```json
{"totalSales":215000}
```


## Update

### Update product

- endpoint: `http://localhost:4000/api/v1/fresh-oil/products/:id`
    `http://localhost:4000/api/v1/fresh-oil/products/69ea4e965fb2f565b07b25de`
- request body:

```json
{
      "quantity": 14,
      "price" : 3400,
      "name" : "virgin oil version 3"
}
```

- response: 

```json
{
    "message": "Product updated successfully",
    "product": {
        "_id": "69ea4e965fb2f565b07b25de",
        "name": "virgin oil version 3",
        "description": "just description",
        "quantity": 14,
        "price": 3400,
        "image": "/uploads/image-1776963222673-696288337.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "total": 47600,
        "createdAt": "2026-04-23T16:53:42.713Z",
        "updatedAt": "2026-04-23T17:34:18.619Z",
        "__v": 0
    }
}
```

### Update order

- endpoint: `http://localhost:4000/api/v1/fresh-oil/orders/:id`
- request body: `http://localhost:4000/api/v1/fresh-oil/orders/69ea540fa9385304bfbbc884`

```json
{
    "quantity": "12"
}
```

- response: 

```json
{
    "message": "Order updated successfully",
    "order": {
        "_id": "69ea540fa9385304bfbbc884",
        "userId": "69e76562713885bf5dbbe900",
        "productName": "mdanza",
        "productId": "69ea4e5b5fb2f565b07b25da",
        "quantity": 12,
        "price": 23000,
        "total": 276000,
        "orderId": "ORDER-FRESH-OIL-1776964623743-9090",
        "createdAt": "2026-04-23T17:17:03.748Z",
        "updatedAt": "2026-04-23T17:35:48.511Z",
        "__v": 0
    }
}
```

## Delete

### Delete product
- this endpoints deals about delete an order into the system.

- endpoint: `http://localhost:4000/api/v1/fresh-oil/products/:id`
`http://localhost:4000/api/v1/fresh-oil/products/69ea4e965fb2f565b07b25de`
- response:

```json
{
    "message": "Deleted successfully",
    "deletedFreshOilProduct": {
        "_id": "69ea4e965fb2f565b07b25de",
        "name": "virgin oil version 3",
        "description": "just description",
        "quantity": 14,
        "price": 3400,
        "image": "/uploads/image-1776963222673-696288337.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "total": 47600,
        "createdAt": "2026-04-23T16:53:42.713Z",
        "updatedAt": "2026-04-23T17:34:18.619Z",
        "__v": 0
    }
}
```

### Delete order
- this endpoints deals about delete an order into the system.

- endpoint: `http://localhost:4000/api/v1/fresh-oil/order/:id`
`http://localhost:4000/api/v1/fresh-oil/order/69e7c1327a501a5133538ebf`
- response:

```json
{
    "message": "Deleted successfully",
    "deletedFreshOilOrder": {
        "_id": "69ea540fa9385304bfbbc884",
        "userId": "69e76562713885bf5dbbe900",
        "productName": "mdanza",
        "productId": "69ea4e5b5fb2f565b07b25da",
        "quantity": 12,
        "price": 23000,
        "total": 276000,
        "orderId": "ORDER-FRESH-OIL-1776964623743-9090",
        "createdAt": "2026-04-23T17:17:03.748Z",
        "updatedAt": "2026-04-23T17:35:48.511Z",
        "__v": 0
    }
}
```