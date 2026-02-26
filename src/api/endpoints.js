// API Endpoint Constants
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },

    // User endpoints
    USER: {
        PROFILE: '/user/profile',
        UPDATE_PROFILE: '/user/profile',
        DASHBOARD: '/user/dashboard',
        ORDERS: '/user/orders',
        FAVORITES: '/user/favorites',
    },

    // Seller endpoints
    SELLER: {
        PROFILE: '/seller/profile',
        DASHBOARD: '/seller/dashboard',
        PRODUCTS: '/seller/products',
        ORDERS: '/seller/orders',
        ANALYTICS: '/seller/analytics',
    },

    // Admin endpoints
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users',
        SELLERS: '/admin/sellers',
        PRODUCTS: '/admin/products',
        ANALYTICS: '/admin/analytics',
        SETTINGS: '/admin/settings',
    },

    // Common endpoints
    CARS: {
        LIST: '/cars',
        DETAIL: (id) => `/cars/${id}`,
        CREATE: '/cars',
        UPDATE: (id) => `/cars/${id}`,
        DELETE: (id) => `/cars/${id}`,
    },
};

export default ENDPOINTS;
