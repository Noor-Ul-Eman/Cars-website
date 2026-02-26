import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

/**
 * Admin Service
 * Handles all admin-related API calls
 */

export const adminService = {
    /**
     * Get admin dashboard data
     * @returns {Promise} - Dashboard data with system metrics
     */
    getDashboardData: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.ADMIN.DASHBOARD);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get all users
     * @param {Object} params - Query parameters (page, limit, search, etc.)
     * @returns {Promise} - List of users
     */
    getUsers: async (params = {}) => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.ADMIN.USERS, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get all sellers
     * @param {Object} params - Query parameters
     * @returns {Promise} - List of sellers
     */
    getSellers: async (params = {}) => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.ADMIN.SELLERS, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get all products
     * @param {Object} params - Query parameters
     * @returns {Promise} - List of products
     */
    getProducts: async (params = {}) => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.ADMIN.PRODUCTS, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get system analytics
     * @returns {Promise} - System analytics data
     */
    getAnalytics: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.ADMIN.ANALYTICS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get system settings
     * @returns {Promise} - System settings
     */
    getSettings: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.ADMIN.SETTINGS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Update system settings
     * @param {Object} settings - Updated settings
     * @returns {Promise} - Updated settings
     */
    updateSettings: async (settings) => {
        try {
            const response = await axiosInstance.put(ENDPOINTS.ADMIN.SETTINGS, settings);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default adminService;
