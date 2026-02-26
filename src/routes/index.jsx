

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { USER_ROLES } from '../utils/constants';

// Pages
import Home from '../pages/Home';
import Search from '../pages/Search';
import Login from '../pages/auth/Login';
import UserDashboard from '../pages/user/UserDashboard';
import SellerDashboard from '../pages/seller/SellerDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdvancedSearch from '../pages/AdvancedSearch';



/**
 * Application Routes
 * Defines all routes with authentication and role-based access control
 */

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/advanced-search" element={<AdvancedSearch />} />
                    <Route path="/login" element={<Login />} />


                    <Route
                        path="/user/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[USER_ROLES.USER]}>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />


                    <Route
                        path="/seller/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[USER_ROLES.SELLER]}>
                                <SellerDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* 404 - Not Found */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;
