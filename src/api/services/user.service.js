import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

/**
 * User Service
 * Handles all user-related API calls
 */

export const userService = {
    /**
     * Get user profile
     * @returns {Promise} - User profile data
     */
    getProfile: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.USER.PROFILE);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Update user profile
     * @param {Object} profileData - Updated profile data
     * @returns {Promise} - Updated user data
     */
    updateProfile: async (profileData) => {
        try {
            const response = await axiosInstance.put(ENDPOINTS.USER.UPDATE_PROFILE, profileData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get user dashboard data
     * @returns {Promise} - Dashboard data
     */
    getDashboardData: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.USER.DASHBOARD);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get user orders
     * @returns {Promise} - List of orders
     */
    getOrders: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.USER.ORDERS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get user favorites
     * @returns {Promise} - List of favorite items
     */
    getFavorites: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.USER.FAVORITES);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default userService;
