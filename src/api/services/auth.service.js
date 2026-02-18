import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export const authService = {
    /**
     * Login user
     * @param {Object} credentials - { email, password }
     * @returns {Promise} - User data and tokens
     */
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);

            // Store tokens
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
            }
            if (response.data.refreshToken) {
                localStorage.setItem('refresh_token', response.data.refreshToken);
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Register new user
     * @param {Object} userData - { email, password, name, role }
     * @returns {Promise} - User data
     */
    register: async (userData) => {
        try {
            const response = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout user
     * @returns {Promise}
     */
    logout: async () => {
        try {
            await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);

            // Clear tokens
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');

            return true;
        } catch (error) {
            // Clear tokens even if API call fails
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            throw error;
        }
    },

    /**
     * Get current user data
     * @returns {Promise} - User data
     */
    getCurrentUser: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.AUTH.ME);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Refresh access token
     * @param {string} refreshToken
     * @returns {Promise} - New tokens
     */
    refreshToken: async (refreshToken) => {
        try {
            const response = await axiosInstance.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default authService;
