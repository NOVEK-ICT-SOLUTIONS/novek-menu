// API constants
export const API_VERSION = 'v1';
export const API_BASE_URL = '/api';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Currency
export const DEFAULT_CURRENCY = 'ETB'; // Ethiopian Birr

// Languages
export const SUPPORTED_LANGUAGES = ['en', 'am', 'or'] as const;
export const DEFAULT_LANGUAGE = 'en';

// File upload
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// QR Code
export const QR_CODE_SIZE = 512;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;
