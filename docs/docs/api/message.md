# Messages

Base path: `/api/v1/messages`

All endpoints require `authenticate`. Category checks use `["admin"]`
unless post endpoint it is public to anyone.

## Endpoints

## POST /

Fields: `name`, `email`, `message`.

```bash
curl -X POST http://localhost:4100/api/v1/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Njox","email":"hello@karibu.zanzlearn.xyz","message": "Hello I would like to know more about karibu system"}'
```

Response (201):

```json
{
  "message": {
    "name": "Njox",
    "email": "hello@karibu.zanzlearn.xyz",
    "message": "Hello I would like to know more about karibu system",
    "_id": "69f3640a0fd399167f0f2428",
    "__v": 0
  }
}
```

## GET

```bash
curl http://localhost:4100/api/v1/messages \
  -H "Authorization: Bearer $TOKEN"
```

## GET /:id

```bash
curl http://localhost:4100/api/v1/messages/<id> \
  -H "Authorization: Bearer $TOKEN"
```

## PUT /:id

Request body (any subset):

```json
{ "name": "Catherine", "message": "Thank you!" }
```

## DELETE /:id

```bash
curl -X DELETE http://localhost:4100/api/v1/messages/<id> \
  -H "Authorization: Bearer $TOKEN"
```
