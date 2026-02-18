import axios from 'axios';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'auth_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem(
                    import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token'
                );

                if (refreshToken) {
                    // Attempt to refresh the token
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                        { refreshToken }
                    );

                    const { token } = response.data;
                    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY || 'auth_token', token);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed - logout user
                localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY || 'auth_token');
                localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Handle other errors
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

export default axiosInstance;
