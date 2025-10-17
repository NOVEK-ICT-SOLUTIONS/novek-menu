# Quick Start Guide

Get Novek Menus running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

This installs all dependencies for the entire monorepo (frontend, backend, and shared packages).

## 2. Set Up Environment Variables

```bash
# Copy example files
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

**Minimum required changes:**

`apps/api/.env`:
```env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/novek_menus
BETTER_AUTH_SECRET=change-this-to-a-random-32-char-string
JWT_SECRET=change-this-to-another-random-string
```

## 3. Start Development

```bash
npm run dev
```

This command starts both:
- Frontend at `http://localhost:3000`
- Backend at `http://localhost:5000`

## 4. Verify Everything Works

Open your browser to:
- Frontend: http://localhost:3000
- API Health: http://localhost:5000/health
- API Info: http://localhost:5000/api/v1

You should see:
- ✅ Frontend showing "Novek Menus" welcome page
- ✅ Health endpoint returning `{"status":"ok"}`
- ✅ API info showing available endpoints

## Next Steps

1. **Set up PostgreSQL database** (for production features)
2. **Explore the codebase**:
   - `apps/web/src` - Frontend code
   - `apps/api/src` - Backend code
   - `packages/shared` - Shared utilities
3. **Read the full README.md** for detailed documentation
4. **Start building features!**

## Common Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start both frontend and backend |
| `npm run dev:web` | Start only frontend |
| `npm run dev:api` | Start only backend |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run build` | Build for production |

## Troubleshooting

**Port already in use?**
```bash
# Change port in apps/web/vite.config.ts (line 15)
# or apps/api/.env (PORT variable)
```

**Module not found?**
```bash
# Reinstall dependencies
npm run clean
npm install
```

**TypeScript errors?**
```bash
# Check types across all workspaces
npm run type-check
```

## Need Help?

- Check the main [README.md](./README.md)
- Review environment examples in `.env.example` files
- Ensure Node.js version >= 20.19.0: `node --version`

---

Happy coding! 🚀
