## Animal Feeding API doc


## Create

### Add product

- endpoint , request body, sample, response status, response body.
- This end point helps an admin to add a product into the store and requires authentication.

- Endpoint - `api/v1/animal-feeding/products` |

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
        "name": "lezod",
        "description": "chakula cha ngombwe ambao wamezaliwa",
        "quantity": 20,
        "price": 50000,
        "image": "/uploads/image-1776795374292-8855409.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "nutrients": "vitamin",
        "_id": "69e7beee9e15259fba95973d",
        "createdAt": "2026-04-21T18:16:14.355Z",
        "updatedAt": "2026-04-21T18:16:14.355Z",
        "total": 1000000,
        "__v": 0
    }
}
```

### Create an order

- endpoint , request body, sample, response status, response body.
- This end point helps an user into the system to create an order based on the product which is available into the system.

- Endpoint - `http://localhost:4000/api/v1/animal-feeding/orders` |

- request body:
```json
{
    "productId": "69e7beee9e15259fba95973d",
    "quantity": 1,
    "productName" : "lezod"
}
```

- response body:

```json
{
    "message": "Order created successfully",
    "order": {
        "productName": "lezod",
        "productId": "69e7beee9e15259fba95973d",
        "quantity": 1,
        "price": 50000,
        "total": 50000,
        "userId": "69e76562713885bf5dbbe900",
        "_id": "69e7c1327a501a5133538ebf",
        "orderId": "ORDER-ANIMAL-FEEDING-1776795954751-2252",
        "createdAt": "2026-04-21T18:25:54.762Z",
        "updatedAt": "2026-04-21T18:25:54.762Z",
        "__v": 0
    }
}
```


## Read

## Get products

- endpoint: `http://localhost:4000/api/v1/animal-feeding/products/`

- response: 

```json
[
    {
        "_id": "69e7beee9e15259fba95973d",
        "name": "lezod",
        "description": "chakula cha ngombwe ambao wamezaliwa",
        "quantity": 18,
        "price": 50000,
        "image": "/uploads/image-1776795374292-8855409.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "nutrients": "vitamin",
        "createdAt": "2026-04-21T18:16:14.355Z",
        "updatedAt": "2026-04-21T18:28:46.768Z",
        "total": 900000,
        "__v": 0
    }
]
```

## Saerch for products

- endpoint: `http://localhost:4000/API/v1/animal-feeding/products/search?name=milk`

- response: 

```json
[
    {
        "_id": "69e7c2cadd38d8d792cd3b77",
        "name": "milk",
        "description": "chakula cha ngombwe ambao wamezaliwa",
        "quantity": 20,
        "price": 50000,
        "image": "/uploads/image-1776796362839-55022849.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "nutrients": "vitamin",
        "createdAt": "2026-04-21T18:32:42.892Z",
        "updatedAt": "2026-04-21T18:32:42.892Z",
        "total": 1000000,
        "__v": 0
    }
]
```


## get product

- endpoint: `http://localhost:4000/API/v1/animal-feeding/products/:id`

- response: 

```json
{
    "_id": "69e7c2cadd38d8d792cd3b77",
    "name": "milk",
    "description": "chakula cha ngombwe ambao wamezaliwa",
    "quantity": 20,
    "price": 50000,
    "image": "/uploads/image-1776796362839-55022849.jpg",
    "userId": "69e76562713885bf5dbbe900",
    "nutrients": "vitamin",
    "createdAt": "2026-04-21T18:32:42.892Z",
    "updatedAt": "2026-04-21T18:32:42.892Z",
    "total": 1000000,
    "__v": 0
}
```

## get orders

- endpoint: `http://localhost:4000/API/v1/animal-feeding/orders`

- response: 

```json
[
    {
        "_id": "69e7c1deca1860a818857f78",
        "productName": "lezod",
        "productId": {
            "_id": "69e7beee9e15259fba95973d",
            "name": "lezod"
        },
        "quantity": 1,
        "price": 50000,
        "total": 50000,
        "userId": "69e76562713885bf5dbbe900",
        "orderId": "ORDER-ANIMAL-FEEDING-1776796126740-2277",
        "createdAt": "2026-04-21T18:28:46.748Z",
        "updatedAt": "2026-04-21T18:28:46.748Z",
        "__v": 0
    }
]
```

## get order

- endpoint: `http://localhost:4000/API/v1/animal-feeding/orders/:id`

- response: 

```json
{
    "_id": "69e7c1deca1860a818857f78",
    "productName": "lezod",
    "productId": "69e7beee9e15259fba95973d",
    "quantity": 1,
    "price": 50000,
    "total": 50000,
    "userId": "69e76562713885bf5dbbe900",
    "orderId": "ORDER-ANIMAL-FEEDING-1776796126740-2277",
    "createdAt": "2026-04-21T18:28:46.748Z",
    "updatedAt": "2026-04-21T18:28:46.748Z",
    "__v": 0
}
```

## get available products

- endpoint: `http://localhost:4000/API/v1/animal-feeding/available-products`

- response: 

```json
{
    "message": "Available products fetched successfully.",
    "products": [
        {
            "_id": "69e7beee9e15259fba95973d",
            "name": "lezod",
            "description": "chakula cha ngombwe ambao wamezaliwa",
            "quantity": 18,
            "price": 50000,
            "image": "/uploads/image-1776795374292-8855409.jpg",
            "userId": "69e76562713885bf5dbbe900",
            "nutrients": "vitamin",
            "createdAt": "2026-04-21T18:16:14.355Z",
            "updatedAt": "2026-04-21T18:28:46.768Z",
            "total": 900000,
            "__v": 0
        }
    ]
}
```

## get revenue

- endpoint: `http://localhost:4000/api/v1/animal-feeding/revenue?period=day`

- response body:

```json
{
    "message": "Day revenue fetched successfully.",
    "revenue": 100000,
    "period": "day",
    "startDate": "2026-04-20T21:00:00.000Z",
    "endDate": "2026-04-21T20:59:59.999Z"
}
```

## total orders

- endpoint: `http://localhost:4000/api/v1/animal-feeding/total-orders?filter=week`

- response body:

```json
{
    "totalCost": 100000
}
```

## Report 

- This endpoint returns the report into the pdf format.

- endpoint: `http://localhost:4000/api/v1/animal-feeding/reports?startDate=2025-01-01&endDate=2026-10-31`


## Update

### Update product

- endpoint: `http://localhost:4000/api/v1/animal-feeding/products/:id`
- request body:

```json
{
    "name": "Chakula kwa ajili ya kuku wadogo",
    "quantity": 1000,
    "price" : 233
}
```

- response: 

```json
{
    "message": "Updated successfully",
    "product": {
        "_id": "69ea48a881acf8883bad558f",
        "name": "Chakula kwa ajili ya kuku wadogo",
        "description": "chakula cha ngombwe ambao wamezaliwa",
        "quantity": 1000,
        "price": 233,
        "image": "/uploads/image-1776961704226-679774037.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "nutrients": "vitamin",
        "createdAt": "2026-04-23T16:28:24.255Z",
        "updatedAt": "2026-04-23T16:28:39.180Z",
        "total": 233000,
        "__v": 0
    }
}
```

### Update order

- endpoint: `http://localhost:4000/api/v1/animal-feeding/orders/:id`
- request body: `http://localhost:4000/api/v1/animal-feeding/orders/69e7c1deca1860a818857f78`

```json
{
    "quantity": 2
}
```

- response: 

```json
{
    "message": "Order updated successfully",
    "order": {
        "_id": "69e7c1deca1860a818857f78",
        "productName": "lezod",
        "productId": "69e7beee9e15259fba95973d",
        "quantity": 2,
        "price": 50000,
        "total": 100000,
        "userId": "69e76562713885bf5dbbe900",
        "orderId": "ORDER-ANIMAL-FEEDING-1776796126740-2277",
        "createdAt": "2026-04-21T18:28:46.748Z",
        "updatedAt": "2026-04-23T16:34:18.145Z",
        "__v": 0
    }
}
```

## Delete

### Delete product
- this endpoints deals about delete an order into the system.

- endpoint: `http://localhost:4000/api/v1/animal-feeding/products/:id`
`http://localhost:4000/api/v1/animal-feeding/products/69e7c2cadd38d8d792cd3b77`
- response:

```json
{
    "product deleted successfully": {
        "_id": "69e7c2cadd38d8d792cd3b77",
        "name": "milk",
        "description": "chakula cha ngombwe ambao wamezaliwa",
        "quantity": 20,
        "price": 50000,
        "image": "/uploads/image-1776796362839-55022849.jpg",
        "userId": "69e76562713885bf5dbbe900",
        "nutrients": "vitamin",
        "createdAt": "2026-04-21T18:32:42.892Z",
        "updatedAt": "2026-04-21T18:32:42.892Z",
        "total": 1000000,
        "__v": 0
    }
}
```

### Delete order
- this endpoints deals about delete an order into the system.

- endpoint: `http://localhost:4000/api/v1/animal-feeding/order/:id`
`http://localhost:4000/api/v1/animal-feeding/order/69e7c1327a501a5133538ebf`
- response:

```json
{
    "message": "Order deleted successfully"
}
```