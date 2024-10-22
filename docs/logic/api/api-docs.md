# Savarrah API Documentation

## Overview
The Savarrah API provides endpoints to manage users, orders, and receipts for a graphic design service platform. This API allows users to register, log in, submit design requests, and retrieve order information.

## Base URL
```
https://api.savarrah.com/v1
```

## Authentication
The API uses token-based authentication. To authenticate, include the following header in your requests:

```
Authorization: Bearer <token>
```

### 1. User Management

#### **1.1 Register User**
- **Endpoint**: `POST /api/users/register`
- **Description**: Create a new user account.
- **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "message": "User registered successfully."
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "error": "Username or email already exists."
      }
      ```

#### **1.2 User Login**
- **Endpoint**: `POST /api/users/login`
- **Description**: Authenticate a user and obtain a token.
- **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "token": "string",
        "userId": "string"
      }
      ```
    - **401 Unauthorized**:
      ```json
      {
        "error": "Invalid credentials."
      }
      ```

#### **1.3 Get User Details**
- **Endpoint**: `GET /api/users/:id`
- **Description**: Retrieve user details by ID.
- **Response**:
    - **200 OK**:
      ```json
      {
        "username": "string",
        "email": "string",
        "createdAt": "date"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "User not found."
      }
      ```

---

### 2. Order Management

#### **2.1 Create Order**
- **Endpoint**: `POST /api/orders`
- **Description**: Create a new order.
- **Request Body**:
    ```json
    {
      "description": "string",
      "price": number,
      "userId": "string"
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "orderId": "string",
        "message": "Order created successfully."
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "error": "Invalid order details."
      }
      ```

#### **2.2 Get All Orders**
- **Endpoint**: `GET /api/orders`
- **Description**: Retrieve all orders (for admin use).
- **Response**:
    - **200 OK**:
      ```json
      [
        {
          "orderId": "string",
          "description": "string",
          "price": number,
          "status": "string",
          "createdAt": "date"
        }
      ]
      ```

#### **2.3 Get Order by ID**
- **Endpoint**: `GET /api/orders/:id`
- **Description**: Retrieve an order by ID.
- **Response**:
    - **200 OK**:
      ```json
      {
        "orderId": "string",
        "description": "string",
        "price": number,
        "status": "string",
        "userId": "string",
        "createdAt": "date"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "Order not found."
      }
      ```

---

### 3. Receipt Management

#### **3.1 Generate Receipt**
- **Endpoint**: `POST /api/receipts`
- **Description**: Generate a receipt for an order.
- **Request Body**:
    ```json
    {
      "orderId": "string",
      "userId": "string",
      "price": number
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "receiptId": "string",
        "message": "Receipt generated successfully."
      }
      ```
    - **400 Bad Request**:
      ```json
      {
        "error": "Invalid receipt details."
      }
      ```

#### **3.2 Get Receipt by Order ID**
- **Endpoint**: `GET /api/receipts/:id`
- **Description**: Retrieve a receipt by order ID.
- **Response**:
    - **200 OK**:
      ```json
      {
        "receiptId": "string",
        "orderId": "string",
        "userId": "string",
        "price": number,
        "createdAt": "date"
      }
      ```
    - **404 Not Found**:
      ```json
      {
        "error": "Receipt not found."
      }
      ```

---

## Error Handling
All responses will return an appropriate HTTP status code along with a JSON object containing an `error` message to help identify issues.

## Conclusion
This documentation serves as a guide for developers to understand how to interact with the Savarrah API. For further assistance, please contact the support team.

---