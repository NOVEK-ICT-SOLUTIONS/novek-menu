import { Router } from 'express';

export const apiRouter = Router();

// Version 1 routes
apiRouter.get('/v1', (_req, res) => {
  res.json({
    message: 'Novek Menus API v1',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/v1',
    },
  });
});

// Placeholder routes for future endpoints
apiRouter.get('/v1/restaurants', (_req, res) => {
  res.json({ message: 'Restaurants endpoint - Coming soon' });
});

apiRouter.get('/v1/branches', (_req, res) => {
  res.json({ message: 'Branches endpoint - Coming soon' });
});

apiRouter.get('/v1/menu', (_req, res) => {
  res.json({ message: 'Menu endpoint - Coming soon' });
});
