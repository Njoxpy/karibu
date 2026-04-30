# API Reference

The Karibu Company Management System exposes a REST API served from the Node.js
backend on `http://localhost:4100/`. All endpoints are prefixed with
`/api/v1/<module>`.

## Base URL

```
http://localhost:4100//api/v1
```

## Authentication

Most endpoints require a JSON Web Token (JWT) issued by `POST /api/v1/users/login`.
Pass it in the `Authorization` header:

```
Authorization: Bearer <token>
```

Authorization is layered:

| Middleware         | Purpose                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `authenticate`     | Verifies the JWT and attaches `req.user`.                            |
| `checkCategory`    | Restricts the route to one or more user categories (e.g. `admin`).   |
| `checkPermissions` | Requires the user to hold a named permission (e.g. `createProduct`). |
| `validateObjectId` | Validates the `:id` path parameter is a valid Mongo ObjectId.        |

## Modules

| Module         | Mount path               | Page                                      |
| -------------- | ------------------------ | ----------------------------------------- |
| Users          | `/api/v1/users`          | [Users](./api/users.md)                   |
| Animal Feeding | `/api/v1/animal-feeding` | [Animal Feeding](./api/animal-feeding.md) |
| Fresh Oil      | `/api/v1/fresh-oil`      | [Fresh Oil](./api/fresh-oil.md)           |
| Godown         | `/api/v1/godown`         | [Godown](./api/godown.md)                 |
| Hardware       | `/api/v1/hardware`       | [Hardware](./api/hardware.md)             |
| Printing       | `/api/v1/printing`       | [Printing](./api/printing.md)             |
| Stationery     | `/api/v1/stationery`     | [Stationery](./api/stationery.md)         |

## Conventions

- All request and response bodies are JSON unless an endpoint explicitly accepts
  `multipart/form-data` (file uploads) or returns a binary PDF.
- Mongo documents are returned as-is, including `_id`, `createdAt`, `updatedAt`,
  and `__v`.
- Error responses use the shape `{ "message": "..." }` or `{ "error": "..." }`.
