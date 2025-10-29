env
# Task API (NestJS + PostgreSQL)

A small REST API to manage tasks with a strict status flow: `pending → in_progress → done`.

Each task has:
- `id` (integer)
- `title` (string)
- `description` (string | optional)
- `status` (enum: `pending` | `in_progress` | `done`)
- `created_at` (timestamp)
- `completed_at` (timestamp | null)

## Tech Stack
- NestJS
- TypeORM
- PostgreSQL
- class-validator (DTO validation)

## Quick start

1) Install dependencies

```bash
npm install
```

2) Configuration

Create a `.env` file in the project root with these variables (adjust as needed):

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=taskdb
```

3) Database

- Use the provided `schema.sql` to create the `task_status` enum and the `tasks` table. It also contains sample data.
- Optionally run a local Postgres with `docker-compose.yml` and then load `schema.sql`.

Start a local Postgres with Docker Compose (optional):

```bash
docker compose up -d
```

Load the schema into the database (example):

```bash
psql "host=localhost port=5432 user=postgres dbname=taskdb" -f schema.sql
```

4) Run the app

- Development (watch mode):

```bash
npm run start:dev
```

- Production build:

```bash
npm run build
npm run start:prod
```

The app will run on `http://localhost:3000` by default (or the `PORT` you set).

## API Endpoints

Base path: `api/v1/tasx`

1) Create a Task
- POST `api/v1/tasx`
- Request body:

```json
{
  "title": "Write documentation",
  "description": "Explain all API endpoints"
}
```
- Response (201 Created):

```json
{
  "id": 4,
  "title": "Write documentation",
  "description": "Explain all API endpoints",
  "status": "pending",
  "created_at": "2025-10-30T17:00:00.000Z",
  "completed_at": null
}
```

2) List all Tasks
- GET `api/v1/tasx`
- Response (200 OK): array of task objects

```json
[
  {
    "id": 1,
    "title": "Read NestJS docs",
    "description": "Skim controllers/providers",
    "status": "pending",
    "created_at": "2025-10-30T10:00:00.000Z",
    "completed_at": null
  }
]
```

3) Update Task Status
- PATCH `api/v1/tasx/update/:id`
- Allowed transitions (enforced): `pending` → `in_progress` → `done`
- Request body:

```json
{ "status": "in_progress" }
```
- Response (200 OK): updated task object. When status becomes `done`, `completed_at` is set.
- Invalid transitions return `400 Bad Request` with a message like:

```json
{ "message": "Invalid status transition. Allowed order: pending -> in_progress -> done." }
```

1) Delete Task
- DELETE `api/v1/tasx/delete/:id`
- Response: `204 No Content`

## Curl examples

Create:

```bash
curl -X POST http://localhost:3000/api/v1/tasx \
  -H "Content-Type: application/json" \
  -d '{"title":"Write tests","description":"Unit tests for service"}'
```

List:

```bash
curl http://localhost:3000/api/v1/tasx
```

Update status (1 → in_progress):

```bash
curl -X PATCH http://localhost:3000/api/v1/tasx/update/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"in_progress"}'
```

Update status (1 → done):

```bash
curl -X PATCH http://localhost:3000/api/v1/tasx/update/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'
```

Delete:

```bash
curl -X DELETE http://localhost:3000/api/v1/tasx/delete/1
```

## Files of interest

- `schema.sql` — SQL to create the `task_status` enum and `tasks` table; includes sample rows.
- `docker-compose.yaml` — optional Postgres service for local development.
- `src/` — NestJS source code (controllers, services, entities, DTOs).
- `test/` — e2e tests (Jest) if you'd like to run integration tests.

## Notes & behavior

- DTO validation is enforced; invalid payloads return `400` responses.
- `completed_at` is automatically set when a task becomes `done`.
- The status flow is strict and cannot be skipped.

## Try it (copyable commands)

### 1. install dependencies
```bash
npm install
```
### 2. (optional) start a local postgres via docker-compose
```bash
docker compose up -d
```
### 3. load DB schema (adjust connection info if needed)
```bash
psql "host=localhost port=5432 user=postgres dbname=taskdb" -f schema.sql
```
### 4. run in dev
```bash
npm run start:dev
```