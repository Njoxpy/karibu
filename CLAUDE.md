# CLAUDE.md

Context for Claude Code (and other AI assistants) working in this repository.

## Project: Karibu

Karibu is the internal company management system for Karibu Company Limited. It is a multi-module platform spanning inventory, sales, and operations across six business lines (Animal Feeding, Fresh Oil, Godown, Hardware, Printing, Stationery) plus user/admin management.

## Repository Layout

| Folder    | Role     | Stack                        | Dev URL                      |
| --------- | -------- | ---------------------------- | ---------------------------- |
| `logic/`  | Backend  | Node.js, Express, MongoDB    | `http://localhost:4000`      |
| `client/` | Frontend | React 18, Vite, Tailwind CSS | `http://localhost:5173`      |
| `docs/`   | Docs     | MkDocs                       | `http://127.0.0.1:8000/`     |

## Backend (`logic/`)

- Entry: `logic/server.js`. Boot order is `connectDB` → `createAdminUser` → `app.listen` (do not reorder — see `docs/docs/backend-fixes.md`).
- Routes: `logic/routes/*.routes.js`, mounted under `/api/v1/<module>`.
- Controllers: `logic/controllers/`. Models: `logic/models/<module>/`. Middleware (auth, permission, upload, rate limit): `logic/middleware/`.
- Auth: JWT via `Authorization: Bearer <token>`. Permission middleware gates admin-only routes.
- Logs rotate daily into `logic/logs/`. Uploads land in `logic/uploads/`.

## Frontend (`client/`)

- Entry: `client/src/main.jsx` → `App.jsx`. Pages under `client/src/pages/` mirror backend modules. Admin layout: `client/src/pages/admin/layout/`.
- Styling: Tailwind, configured in `client/tailwind.config.js` against the design system in `.claude/agents/AGENTS.md`.
- API calls: `client/src/services/` (axios). Backend base is `http://localhost:4000`.

## Docs (`docs/`)

- MkDocs site. Per-module API pages under `docs/docs/api/`. Style guide in `docs/STYLE_GUIDE.md`.
- Update `docs/mkdocs.yml` nav when adding pages. Verify with `mkdocs build --strict`.
- `docs/docs/backend-fixes.md` is the running log of backend bugs and fixes.

## Design System (`.claude/agents/AGENTS.md`)

Enterprise blue theme. Primary `#1565D8`, navy `#0F172A`, white background, surface `#F8FAFC`, Inter font, 280 px sidebar, 72 px topnav, `rounded-12/16`, soft shadows. Tailwind tokens are centralized — prefer `bg-primary`, `text-navy`, `border-brandBorder`, `shadow-soft`, `w-sidebar`, `h-topnav`, `font-sans` over hard-coded indigo/gray classes.

## Rules

- **No emojis** anywhere — code, content, commits, comments, UI copy.
- **Ask first when unsure.** Do not guess at routing, schema, naming, or permissions.
- **Minimal, focused changes.** No speculative abstractions, no backwards-compat shims, no half-finished work.
- **Responsive UI is required** — every screen must work on mobile and desktop.
- **Keep modules consistent.** Each business line should have parallel structure across `logic/routes`, `logic/controllers`, `logic/models`, `client/src/pages`, and `docs/docs/api`.

## Working Notes

- When adding a backend endpoint: update the route, controller, and model, then add it to the matching `docs/docs/api/<module>.md` page.
- When adding a UI screen: use the AGENTS.md tokens, place it under the module's pages folder, and wire it through `client/src/services/`.
- Known follow-ups (see `docs/docs/backend-fixes.md`): `permissionMiddleware` compares `req.method` against permission names; `routes/stationery.routes.js:217` uses category `"animal-feeding"` instead of `"stationery"`.
