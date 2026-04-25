# Backend Fixes — logic/

Audit of `logic/` (Node/Express, port 4000). The server boots cleanly, MongoDB connects, and key endpoints respond as expected. Below is the list of every issue found and the fix applied (or, where noted, the reason it was left untouched per the "minimal focused changes" rule).

## Fixed

### 1. server.js — admin bootstrap ran before DB connection
- File/line: `logic/server.js:102-107`
- Problem: `createAdminUser()` was invoked at module top-level, then `app.listen(...)` started, and `connectDB()` was only called inside the listen callback. This meant:
  - Admin creation queries ran while Mongoose had no connection (relying on Mongoose's buffer, racy and silently fails if the DB host is unreachable).
  - The HTTP server began accepting requests before Mongo was confirmed up.
- Fix: Wrapped startup in an async `start()` that awaits `connectDB()`, then `createAdminUser()`, then calls `app.listen()`. Boot order is now deterministic.

## Verified working

- `npm start` / `node server.js` boots cleanly under nodemon.
- `GET /` -> 200 `{"message":"Karibu is running!"}`
- `GET /api/v1/animal-feeding/products` (no token) -> 401 (auth middleware engaged)
- `POST /api/v1/users/login` (empty body) -> 400 "Email and password are required"
- `POST /api/v1/users/create-admin` -> 400 "Admin already exists" (admin bootstrap succeeded)
- Unknown route -> 404 "Route not found"

## Issues observed but intentionally NOT changed

These are pre-existing oddities that do not break boot or core endpoint behaviour. Per the instruction "minimal focused changes / no backwards-compat shims", they are documented here rather than rewritten.

1. `middleware/auth/permissionMiddleware.js:15-21` — compares `req.method.toLowerCase()` (e.g. `"post"`) against permission strings like `["createProduct"]`. For non-admin users this will always 403. In practice every route that uses `checkPermissions` is also gated by `checkCategory(["admin"])`, and admins bypass the check, so no live route is broken. A future non-admin role with permissions will need this rewritten to consult `req.user.permissions`.
2. `controllers/animalFeeding.controller.js` — exported function name `getAnimalFeedingReporort` (typo). Both the controller and the route use the same misspelling, so the route works. Renaming would be a wider rename across both files.
3. `routes/animalFeeding.routes.js:1-180` and `routes/freshOil.routes.js:1-180` — the product-create POST handler is implemented inline in the route file instead of in the controller. Functional, just inconsistent with the rest of the codebase.
4. `services/printing/printingService.js` and `services/stationery/stationeryService.js` — exported helpers `getPrintingOrderss` / `getStationeryOrderss` (double-s typo). Imports in the corresponding routes use the same misspelling, so they work.
5. `controllers/stationery.controller.js:196-...` — there is a second `const createStationeryOrder = ...` declaration further down in the file, but it lives entirely inside a `/* ... */` block comment, so it does not produce a redeclaration error. Left as-is.
6. `controllers/animalFeeding.controller.js` and `controllers/stationery.controller.js` — duplicate model imports (`Product` + `AnimalFeedingProduct`, `Order` + `AnimalFeedingOrder`). Both alias the same module; harmless.
7. `logs/logger.js:33` — exported middleware function is named `loger` (typo). Exported correctly via `module.exports = loger`, so the `app.use(logger)` import works.
8. `routes/stationery.routes.js:217` — `available-products` is gated by `checkCategory(["animal-feeding", "admin"])` instead of `["stationery", "admin"]`. Likely a copy-paste error but not a boot/runtime failure.
9. `routes/godown.routes.js:280-286` — `checkPermissions(["transferInventory"])` will reject every non-admin (see issue #1). Admins still pass.

## Notes for follow-up

- A separate pass to harden `permissionMiddleware` and switch to JWT-embedded `permissions` arrays is recommended; it would also unblock issues #1 and #9 above.
- The category mismatch in `routes/stationery.routes.js:217` is a one-line fix worth doing in a dedicated commit.
