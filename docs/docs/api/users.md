# Users

Base path: `/api/v1/users`

## Endpoints

| Method | Path                | Auth          | Permission   | Description                       |
|--------|---------------------|---------------|--------------|-----------------------------------|
| POST   | `/login`            | Public        |              | Authenticate and obtain a JWT.    |
| POST   | `/signup`           | Admin         | `createUser` | Create a new user.                |
| POST   | `/create-admin`     | Public        |              | Bootstrap an admin account.       |
| GET    | `/`                 | Admin         | `viewUsers`  | List all users.                   |
| GET    | `/total-users`      | Admin         | `viewUsers`  | Count of users.                   |
| GET    | `/:id`              | Admin         | `viewUsers`  | Get a user by id.                 |
| PUT    | `/:id`              | Admin         | `updateUser` | Update a user.                    |
| DELETE | `/:id`              | Admin         | `deleteUser` | Delete a user.                    |

## POST /login

Request body:

```json
{
  "email": "admin@https://api.karibu.zanzlearn.xyz/",
  "password": "secret"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@https://api.karibu.zanzlearn.xyz/",
    "category": "admin"
  }
}
```

curl:

```bash
curl -X POST http://localhost:4000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@https://api.karibu.zanzlearn.xyz/","password":"secret"}'
```

## POST /signup

Admin-only. Creates a new user.

Request body:

```json
{
  "name": "Jane",
  "email": "jane@https://api.karibu.zanzlearn.xyz/",
  "password": "secret",
  "category": "animal-feeding",
  "permissions": ["createOrder"]
}
```

curl:

```bash
curl -X POST http://localhost:4000/api/v1/users/signup \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@https://api.karibu.zanzlearn.xyz/","password":"secret","category":"animal-feeding"}'
```

## POST /create-admin

Bootstrap endpoint that creates the first admin account when the system has no
admin yet.

```bash
curl -X POST http://localhost:4000/api/v1/users/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Owner","email":"owner@https://api.karibu.zanzlearn.xyz/","password":"secret"}'
```

## GET /

List all users.

```bash
curl http://localhost:4000/api/v1/users/ \
  -H "Authorization: Bearer $TOKEN"
```

## GET /total-users

```bash
curl http://localhost:4000/api/v1/users/total-users \
  -H "Authorization: Bearer $TOKEN"
```

Response:

```json
{ "totalUsers": 7 }
```

## GET /:id

```bash
curl http://localhost:4000/api/v1/users/69e76562713885bf5dbbe900 \
  -H "Authorization: Bearer $TOKEN"
```

## PUT /:id

Request body (any subset of the fields):

```json
{
  "name": "Jane Doe",
  "category": "stationery",
  "permissions": ["createOrder", "viewUsers"]
}
```

## DELETE /:id

```bash
curl -X DELETE http://localhost:4000/api/v1/users/<id> \
  -H "Authorization: Bearer $TOKEN"
```
