# Test fleet | Guillaume Gozillon

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
