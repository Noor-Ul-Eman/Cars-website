import LoginForm from '../../components/auth/LoginForm';

/**
 * Login Page
 * Public login page
 */

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 px-4">
            <LoginForm />
        </div>
    );
};

export default Login;
