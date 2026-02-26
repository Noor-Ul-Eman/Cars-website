/**
 * User roles constants
 */
export const USER_ROLES = {
    USER: 'user',
    SELLER: 'seller',
    ADMIN: 'admin',
};

/**
 * API status codes
 */
export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
};

export default {
    USER_ROLES,
    STATUS_CODES,
    STORAGE_KEYS,
};
