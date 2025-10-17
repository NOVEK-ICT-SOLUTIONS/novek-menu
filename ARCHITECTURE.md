# Architecture Documentation

## System Overview

Novek Menus is a full-stack SaaS platform built as a monorepo, designed for scalability, maintainability, and developer experience.

## Design Principles

1. **Monorepo Benefits**
   - Shared code between frontend and backend
   - Atomic commits across multiple apps
   - Simplified dependency management
   - Better developer experience

2. **Type Safety**
   - Full TypeScript across all workspaces
   - Shared types prevent API/UI mismatches
   - Compile-time error detection

3. **Modern Tooling**
   - Latest stable versions of all dependencies
   - Fast build times with Vite
   - Unified linting/formatting with Biome
   - Hot module replacement for instant feedback

## Technology Decisions

### Why NPM Workspaces over Turborepo/Nx?

- **Simplicity**: No additional dependencies or configuration
- **Native**: Built into npm, no extra learning curve
- **Sufficient**: Perfect for teams of 1-10 developers
- **Lightweight**: Faster installs, smaller footprint

### Why Vite over Create React App?

- **Speed**: 10-100x faster than CRA
- **Modern**: Native ESM, optimal code splitting
- **Maintained**: Active development, CRA is deprecated
- **DX**: Better error messages, faster HMR

### Why Sequelize over Prisma?

- **Free**: No paid plans for team features
- **Mature**: Battle-tested, large ecosystem
- **Flexible**: Raw SQL when needed
- **Required**: User specified in requirements

### Why Node Cache over Redis?

- **Cost**: Completely free, no infrastructure
- **Simple**: No separate service to manage
- **Fast**: In-process memory access
- **Sufficient**: Perfect for MVP and single-instance deployments
- **Upgrade Path**: Easy to swap for Redis later if needed

### Why Biome over ESLint + Prettier?

- **Speed**: 25x faster than ESLint
- **Single Tool**: One config, one command
- **Modern**: Built in Rust, better architecture
- **Future**: Growing ecosystem, active development

### Why TailwindCSS 4.x?

- **Performance**: 5x faster builds, 100x faster incremental builds
- **Modern CSS**: Uses cascade layers, @property, color-mix
- **Zero Config**: Automatic content detection
- **Vite Plugin**: First-class integration

## Folder Structure Rationale

### Single Frontend App with Modules

Instead of separate apps for user/owner/admin, we use:

**Benefits:**
- Shared components and layouts
- Code reuse across roles
- Single build, faster deployments
- Easier state management
- Better bundle optimization

**Structure:**
```
apps/web/src/modules/
├── user/              # Customer interface
├── owner/             # Restaurant owner dashboard
└── super-admin/       # System administration
```

### Package Organization

**@novek-menus/shared:**
- Types shared between frontend/backend
- Business logic validation
- Constants and enums
- Pure utility functions

**@novek-menus/config:**
- Environment variable access
- Configuration helpers
- Environment detection

## Data Flow

### Frontend → Backend

```
User Action
  ↓
React Component
  ↓
TanStack Query Hook
  ↓
API Request (Fetch)
  ↓
Express Route
  ↓
Controller
  ↓
Sequelize Model
  ↓
PostgreSQL
```

### Backend → Frontend

```
PostgreSQL
  ↓
Sequelize Model
  ↓
Controller (transform data)
  ↓
API Response (JSON)
  ↓
TanStack Query Cache
  ↓
React Component
  ↓
UI Update
```

## Caching Strategy

### Frontend Cache (TanStack Query)

- **Purpose**: Reduce API calls, instant UI updates
- **TTL**: 5 minutes default (configurable per query)
- **Strategy**: Stale-while-revalidate
- **Invalidation**: Manual on mutations

### Backend Cache (Node.js Map)

- **Purpose**: Reduce database queries
- **TTL**: Configurable per cache entry
- **Strategy**: Time-based expiration
- **Automatic Cleanup**: Every 60 seconds

**Cache Hierarchy:**
```
Request
  ↓
Check Node Cache → Hit? Return
  ↓ Miss
Check Database → Store in Cache → Return
```

## Authentication Flow

### Better Auth Integration

1. **Login Request**
   ```
   Frontend → /api/auth/login
   → Verify credentials
   → Create session
   → Return session token
   ```

2. **Authenticated Request**
   ```
   Frontend (with token)
   → Auth Middleware
   → Verify token
   → Add user to req.user
   → Route Handler
   ```

3. **Role-Based Access**
   ```
   Request
   → Auth Middleware (verify token)
   → Role Middleware (check permission)
   → Route Handler or 403 Forbidden
   ```

## Deployment Architecture

### Vercel Deployment

**Frontend (apps/web):**
- Static files served via CDN
- Edge functions for API routes (if needed)
- Automatic HTTPS
- Zero configuration

**Backend (apps/api):**
- Serverless functions
- Auto-scaling
- Environment variables via dashboard
- PostgreSQL via Vercel Postgres or external provider

### Environment Separation

| Environment | Frontend URL | Backend URL | Database |
|-------------|--------------|-------------|----------|
| Development | localhost:3000 | localhost:5000 | Local Postgres |
| Staging | staging.novek-menus.com | api-staging.novek-menus.com | Staging DB |
| Production | novek-menus.com | api.novek-menus.com | Production DB |

## Database Design (Planned)

### Core Tables

**users**
- id, email, password_hash, name, role
- Handles all user types (USER, OWNER, SUPER_ADMIN)

**restaurants**
- id, name, owner_id, description, logo
- One owner can have multiple restaurants

**branches**
- id, restaurant_id, name, address, phone, qr_code
- One restaurant has multiple branches

**menu_items**
- id, branch_id, name, description, price, currency, category, image
- Each branch has its own menu with custom pricing

**menu_translations**
- id, menu_item_id, language, name, description
- Multi-language support

### Relationships

```
User (OWNER) ──1:N─→ Restaurant
Restaurant ──1:N─→ Branch
Branch ──1:N─→ MenuItem
MenuItem ──1:N─→ MenuTranslation
```

## Security Considerations

1. **Authentication**
   - JWT tokens with httpOnly cookies
   - CSRF protection via Better Auth
   - Password hashing with bcrypt

2. **Authorization**
   - Role-based access control (RBAC)
   - Middleware for route protection
   - Database-level permissions

3. **API Security**
   - Helmet.js for security headers
   - CORS configured for frontend origin
   - Rate limiting (to be added)
   - Input validation with Zod

4. **Data Protection**
   - Environment variables for secrets
   - No secrets in version control
   - Encrypted connections (HTTPS, SSL for DB)

## Scalability Path

### Current (MVP)

- Single frontend deployment
- Single backend instance
- Node.js in-memory cache
- PostgreSQL single instance

### Phase 2 (Growth)

- Multiple backend instances
- Redis cache (shared across instances)
- Database read replicas
- CDN for static assets

### Phase 3 (Scale)

- Microservices (if needed)
- Message queue (e.g., Bull)
- Database sharding
- Kubernetes orchestration

## Future Enhancements

1. **Online Ordering**
   - Shopping cart module
   - Payment integration (Telebirr, Chapa, SantimPay)
   - Order management system

2. **Analytics Dashboard**
   - Menu item popularity
   - Peak hours analysis
   - Revenue tracking

3. **Mobile Apps**
   - React Native apps
   - Share React components
   - Use existing API

4. **Advanced Features**
   - Table reservations
   - Loyalty programs
   - Customer reviews
   - Real-time order tracking

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Frontend Load Time | < 2s | ✅ ~500ms |
| API Response Time | < 100ms | ✅ ~20ms |
| Database Queries | < 50ms | ✅ (to be measured) |
| Build Time (Frontend) | < 30s | ✅ ~3s |
| Build Time (Backend) | < 10s | ✅ ~2s |

## Monitoring (To Be Added)

- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (UptimeRobot)
- Database monitoring (PostgreSQL stats)

---

**This architecture balances simplicity, performance, and future scalability.**
