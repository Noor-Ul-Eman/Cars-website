import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import Loader from '../../common/Loader';

/**
 * ProtectedRoute Component
 * Route wrapper for authentication and role-based access control
 */

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <Loader fullPage />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to appropriate dashboard based on user role
        const redirectPath = `/${user?.role}/dashboard`;
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
