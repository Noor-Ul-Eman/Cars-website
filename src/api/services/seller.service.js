import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

/**
 * Seller Service
 * Handles all seller-related API calls
 */

export const sellerService = {
    /**
     * Get seller profile
     * @returns {Promise} - Seller profile data
     */
    getProfile: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.SELLER.PROFILE);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get seller dashboard data
     * @returns {Promise} - Dashboard data with metrics
     */
    getDashboardData: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.SELLER.DASHBOARD);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get seller products
     * @returns {Promise} - List of products
     */
    getProducts: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.SELLER.PRODUCTS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get seller orders
     * @returns {Promise} - List of orders
     */
    getOrders: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.SELLER.ORDERS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get seller analytics
     * @returns {Promise} - Analytics data
     */
    getAnalytics: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.SELLER.ANALYTICS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default sellerService;
