import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../common/Input';
import Button from '../../common/Button';

/**
 * LoginForm Component
 * Login form with email/password and validation
 */

const LoginForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setApiError('');

            const data = await login(formData);

            // Redirect based on user role
            const redirectPath = `/${data.user.role}/dashboard`;
            navigate(redirectPath);
        } catch (error) {
            setApiError(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="card">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">{t('login.title')}</h2>
                    <p className="text-gray-600 mt-2">{t('login.subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {apiError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {apiError}
                        </div>
                    )}

                    <Input
                        label={t('login.email')}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('login.placeholders.email')}
                        error={errors.email}
                        required
                    />

                    <Input
                        label={t('login.password')}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t('login.placeholders.password')}
                        error={errors.password}
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-gray-600">{t('login.rememberMe')}</span>
                        </label>
                        <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                            {t('login.forgotPassword')}
                        </a>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        className="w-full"
                    >
                        {t('login.signIn')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {t('login.noAccount')}{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                            {t('login.signUp')}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
