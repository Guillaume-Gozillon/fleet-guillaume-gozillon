# Test monorepo | Guillaume Gozillon

## Installation

```bash
# Install dependencies
pnpm install

# Initialize Prisma (backend)
pnpm -F backend prisma migrate dev --name init

# Generate shared types
pnpm generate:types

# Seed database
pnpm -F backend seed
```

## Run

```bash
pnpm dev
```

- **Backend** → http://localhost:3000/api/users
- **Frontend** → http://localhost:5173

## SQL : PostgreSQL + Docker

```bash
# run from the repo root – or replace $(pwd)/sql with the absolute path to the sql folder

docker rm -f pg-temp 2>/dev/null; \
  docker run --rm --name pg-temp \
    -e POSTGRES_USER=test \
    -e POSTGRES_PASSWORD=test \
    -e POSTGRES_DB=testdb \
    -v "$(pwd)/sql":/docker-entrypoint-initdb.d:ro \
    -p 5432:5432 \
    -d postgres:15-alpine; \
  docker logs -f pg-temp
```

### Shut down (cleans everything)

```bash
docker stop pg-temp
```
