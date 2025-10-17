# Novek Menus

> QR Menu Platform for Restaurants in Ethiopia

A modern, scalable monorepo built with NPM workspaces, featuring a Vite + React frontend and Express.js backend with Sequelize ORM.

## 📋 Project Overview

Novek Menus allows restaurants in Ethiopia to:
- Create and manage multiple restaurant branches
- Customize menus per branch with different pricing
- Generate QR codes for customers to view menus
- Support multi-language menus (English, Amharic, Oromo)
- Prepare for future online ordering capabilities

### User Roles

- **User** (Customer): Scan QR codes and view restaurant menus
- **Owner**: Manage restaurants, branches, and menus
- **Super Admin**: System administration and oversight

## 🏗️ Architecture

### Monorepo Structure

```
novek-menus/
├── apps/
│   ├── web/                 # Vite + React frontend
│   └── api/                 # Express.js backend
├── packages/
│   ├── shared/              # Shared types, utilities, constants
│   └── config/              # Environment configuration helpers
├── scripts/                 # Automation scripts
└── package.json             # Root package with workspace config
```

### Tech Stack

**Frontend:**
- Vite 7.x (Latest)
- React 19.x (Latest)
- TypeScript 5.9.x
- TailwindCSS 4.x
- React Router 7.x
- TanStack Query 5.x
- React Table 8.x
- Better Auth 1.3.x

**Backend:**
- Node.js 20.19+ (Required)
- Express.js 5.x
- TypeScript 5.9.x
- Sequelize 6.x (ORM)
- PostgreSQL
- Better Auth 1.3.x

**Development Tools:**
- Biome 2.2.x (Linting & Formatting)
- NPM Workspaces (Monorepo management)
- TSX (TypeScript execution)

**Caching:**
- Node.js native in-memory cache (free, no Redis needed)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.19.0
- NPM >= 10.0.0
- PostgreSQL (for production)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd novek-menus
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
# Root level
cp .env.example .env

# Frontend
cp apps/web/.env.example apps/web/.env

# Backend
cp apps/api/.env.example apps/api/.env
```

Edit the `.env` files with your configuration.

### Development

**Run both frontend and backend together:**

```bash
npm run dev
```

**Run frontend only:**

```bash
npm run dev:web
```

Frontend will be available at: `http://localhost:3000`

**Run backend only:**

```bash
npm run dev:api
```

API will be available at: `http://localhost:5000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both frontend and backend concurrently |
| `npm run dev:web` | Run frontend development server |
| `npm run dev:api` | Run backend development server |
| `npm run build` | Build all workspaces |
| `npm run build:web` | Build frontend for production |
| `npm run build:api` | Build backend for production |
| `npm run lint` | Lint all code with Biome |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm run format` | Format all code with Biome |
| `npm run type-check` | TypeScript type checking across all workspaces |
| `npm run clean` | Clean all node_modules and build artifacts |

## 📦 Package Structure

### @novek-menus/shared

Shared utilities, types, and constants used across frontend and backend.

**Exports:**
- Types: User roles, Restaurant, Branch, MenuItem, API responses
- Constants: API version, pagination defaults, cache TTL
- Utils: Validation, string manipulation, date formatting, price formatting

### @novek-menus/config

Environment configuration helpers for safe access to environment variables.

**Exports:**
- `getEnv()`: Get required environment variable
- `getEnvNumber()`: Get numeric environment variable
- `getEnvBoolean()`: Get boolean environment variable
- Environment helpers: `isDevelopment()`, `isProduction()`, `isTest()`

## 🔧 Configuration

### Import Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of: import { User } from '../../packages/shared/src/types'
import { User } from '@novek-menus/shared';

// Frontend local imports
import { Button } from '@/components/Button';
```

### Biome Configuration

Biome replaces ESLint and Prettier with a single fast tool.

- Schema: Latest (2.2.6)
- Formatting: 2 spaces, single quotes, semicolons, 100 char line width
- Linting: Recommended rules enabled
- Git integration: Respects .gitignore

### TypeScript Configuration

- Target: ES2022
- Module: ESNext
- Strict mode enabled
- Path aliases configured for all workspaces
- Project references for faster builds

## 🗄️ Database

The project uses Sequelize ORM with PostgreSQL.

**Setup database:**

```bash
# Create database
createdb novek_menus

# Run migrations
npm run db:migrate --workspace=apps/api

# Seed data (optional)
npm run db:seed --workspace=apps/api
```

## 🔐 Authentication

The project uses [Better Auth](https://better-auth.com/) for authentication.

- Framework-agnostic
- TypeScript-first
- Supports email/password, OAuth, magic links
- Built-in session management
- CSRF protection

## 💾 Caching Strategy

**Node.js In-Memory Cache**

- Free and fast
- Perfect for single-instance deployments
- Automatic cleanup of expired entries
- TTL-based expiration
- Located at: `apps/api/src/cache/cache.ts`

**Usage:**

```typescript
import { cache } from '@/cache/cache';

// Set with TTL (seconds)
cache.set('user:123', userData, 300); // 5 minutes

// Get
const user = cache.get('user:123');

// Delete
cache.delete('user:123');
```

## 🚢 Deployment

### Vercel (Recommended)

The monorepo is optimized for Vercel deployment.

**Frontend (apps/web):**
- Build Command: `npm run build:web`
- Output Directory: `apps/web/dist`
- Install Command: `npm install`

**Backend (apps/api):**
- Build Command: `npm run build:api`
- Output Directory: `apps/api/dist`
- Install Command: `npm install`

### Environment Variables

Set these in your deployment platform:

- `NODE_ENV=production`
- `DATABASE_URL=<your-postgres-url>`
- `BETTER_AUTH_SECRET=<32-char-secret>`
- `BETTER_AUTH_URL=<your-api-url>`
- `JWT_SECRET=<your-jwt-secret>`
- `FRONTEND_URL=<your-frontend-url>`

## 📚 API Documentation

### Base URL

`http://localhost:5000/api`

### Endpoints

**Health Check:**
```
GET /health
```

**API Info:**
```
GET /api/v1
```

**Restaurants (Coming Soon):**
```
GET /api/v1/restaurants
```

**Branches (Coming Soon):**
```
GET /api/v1/branches
```

**Menu (Coming Soon):**
```
GET /api/v1/menu
```

## 🎨 Frontend Structure

```
apps/web/src/
├── modules/
│   ├── user/              # Customer-facing UI
│   ├── owner/             # Restaurant owner dashboard
│   └── super-admin/       # System admin dashboard
├── components/            # Shared components
├── hooks/                 # Custom React hooks
├── layouts/               # Layout components
├── routes/                # React Router configuration
└── utils/                 # Frontend utilities
```

## 🔌 Backend Structure

```
apps/api/src/
├── routes/                # Express routes
├── controllers/           # Request handlers
├── models/                # Sequelize models
├── middleware/            # Express middleware
├── database/              # Migrations & seeds
├── cache/                 # Caching layer
└── utils/                 # Backend utilities
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Test specific workspace
npm run test --workspace=apps/web
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint:fix`
4. Run type checking: `npm run type-check`
5. Test your changes
6. Submit a pull request

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

Built with modern tools and best practices for Ethiopian restaurants.

---

**Made with ❤️ for Ethiopian restaurants**
