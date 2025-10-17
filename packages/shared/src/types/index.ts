// User roles
export enum UserRole {
  USER = 'USER',
  OWNER = 'OWNER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Restaurant types
export interface Restaurant {
  id: string;
  name: string;
  ownerId: string;
  description?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Branch types
export interface Branch {
  id: string;
  restaurantId: string;
  name: string;
  address: string;
  phone?: string;
  managerId?: string;
  qrCode?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Menu types
export interface MenuItem {
  id: string;
  branchId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  category: string;
  image?: string;
  isAvailable: boolean;
  preparationTime?: number;
  allergens?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Language support
export enum Language {
  ENGLISH = 'en',
  AMHARIC = 'am',
  OROMO = 'or',
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
