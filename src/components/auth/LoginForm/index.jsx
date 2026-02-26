import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';
import Input from '../../common/Input';
import Button from '../../common/Button';

/**
 * LoginForm Component
 * Redesigned with tabs and social login to match mobile.de style
 */

const LoginForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [activeTab, setActiveTab] = useState('login'); // login, register
    const [showPassword, setShowPassword] = useState(false);
    const [agreeConsent, setAgreeConsent] = useState(false);

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

        if (activeTab === 'register' && !agreeConsent) {
            setApiError('Please agree to the processing of your data.');
            return;
        }

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
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-[#f7f8fa]">
                <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-4 text-center font-bold text-[16px] transition-all relative ${activeTab === 'login'
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    Login
                    {activeTab === 'login' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-4 text-center font-bold text-[16px] transition-all relative ${activeTab === 'register'
                        ? 'text-primary-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                >
                    Register
                    {activeTab === 'register' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>
                    )}
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'login' ? (
                    <>
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold text-[#222]">Hello! Welcome back!</h2>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-3 mb-4">
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-[#222] font-semibold text-[15px] hover:bg-gray-50 transition-all cursor-pointer">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c3.12 0 5.86-1.03 7.82-2.8l-3.57-2.77c-.99.66-2.23 1.06-3.75 1.06-2.88 0-5.33-1.95-6.21-4.57H2.57v3.25C4.42 20.26 8.01 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.79 13.92c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V6.49H2.57C1.65 8.15 1.13 10.01 1.13 12s.52 3.85 1.44 5.51l3.22-2.59z" />
                                    <path fill="#EA4335" d="M12 5.04c1.7 0 3.22.58 4.41 1.71l3.31-3.3C17.7 1.63 15.11 1 12 1 8.01 1 4.42 3.74 2.57 7.49l3.22 2.59c.88-2.62 3.33-4.57 6.21-4.57z" />
                                </svg>
                                <span>Sign in with Google</span>
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-[#222] font-semibold text-[15px] hover:bg-gray-50 transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.23 0-1.63-.74-3.13-.74-1.53 0-1.99.74-3.13.74-1.14 0-2.24-.71-3.23-1.61-2-1.85-3.52-5.23-3.52-8.19 0-4.59 3-7.07 5.9-7.07 1.54 0 2.84.85 3.84.85 1 0 2.5-.85 4.3-.85.8 0 3.03.29 4.54 2.5-3.69 2.18-3.09 6.84.58 8.4-1 .96-2.13 2.11-2.94 2.91v-.01zM11.97 4.7c-.15 2.13-1.97 3.8-3.93 3.59.2-2.3 2.05-4.14 4.07-3.6 0 .04-.07.03-.14.01z" />
                                </svg>
                                <span>Sign in with Apple</span>
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <span className="relative px-4 bg-white text-gray-500 text-[13px] uppercase tracking-wider">or</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {apiError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                                    {apiError}
                                </div>
                            )}

                            <div>
                                <label className="block text-[15px] font-bold text-gray-700 mb-1.5">E-Mail address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all text-[#222]"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-[15px] font-bold text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all text-[#222] pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="pt-1">
                                <a href="#" className="text-[14px] text-[#222] font-semibold underline decoration-1 underline-offset-4 hover:text-black">
                                    Forgotten Your Password?
                                </a>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={loading}
                                    className="w-full py-4 text-[17px] font-bold shadow-md"
                                >
                                    Log In
                                </Button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="mb-5">
                            <h2 className="text-2xl font-bold text-[#222]">Create your Cars Website account!</h2>
                        </div>

                        {/* Social Register Buttons */}
                        <div className="space-y-3 mb-4">
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-[#222] font-semibold text-[15px] hover:bg-gray-50 transition-all cursor-pointer">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c3.12 0 5.86-1.03 7.82-2.8l-3.57-2.77c-.99.66-2.23 1.06-3.75 1.06-2.88 0-5.33-1.95-6.21-4.57H2.57v3.25C4.42 20.26 8.01 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.79 13.92c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V6.49H2.57C1.65 8.15 1.13 10.01 1.13 12s.52 3.85 1.44 5.51l3.22-2.59z" />
                                    <path fill="#EA4335" d="M12 5.04c1.7 0 3.22.58 4.41 1.71l3.31-3.3C17.7 1.63 15.11 1 12 1 8.01 1 4.42 3.74 2.57 7.49l3.22 2.59c.88-2.62 3.33-4.57 6.21-4.57z" />
                                </svg>
                                <span>Register with Google</span>
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg text-[#222] font-semibold text-[15px] hover:bg-gray-50 transition-all cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05 1.61-3.22 1.61-1.23 0-1.63-.74-3.13-.74-1.53 0-1.99.74-3.13.74-1.14 0-2.24-.71-3.23-1.61-2-1.85-3.52-5.23-3.52-8.19 0-4.59 3-7.07 5.9-7.07 1.54 0 2.84.85 3.84.85 1 0 2.5-.85 4.3-.85.8 0 3.03.29 4.54 2.5-3.69 2.18-3.09 6.84.58 8.4-1 .96-2.13 2.11-2.94 2.91v-.01zM11.97 4.7c-.15 2.13-1.97 3.8-3.93 3.59.2-2.3 2.05-4.14 4.07-3.6 0 .04-.07.03-.14.01z" />
                                </svg>
                                <span>Register with Apple</span>
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <span className="relative px-4 bg-white text-gray-500 text-[13px] uppercase tracking-wider">or</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {apiError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                                    {apiError}
                                </div>
                            )}

                            <div>
                                <label className="block text-[15px] font-bold text-gray-700 mb-1.5">E-Mail address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all text-[#222]"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-[15px] font-bold text-gray-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all text-[#222] pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            {/* Password Requirements */}
                            <div className="grid grid-cols-2 gap-y-2 py-2">
                                {[
                                    { label: 'At least 8 characters', met: formData.password.length >= 8 },
                                    { label: 'Letters', met: /[a-zA-Z]/.test(formData.password) },
                                    { label: 'Numbers or special characters !$%?-_+#', met: /[0-9!$%?-_+#]/.test(formData.password) }
                                ].map((req, i) => (
                                    <div key={i} className={`flex items-center gap-2 text-[13px] ${i === 2 ? 'col-span-2' : ''}`}>
                                        <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${req.met ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                                            {req.met && (
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={req.met ? 'text-[#222] font-semibold' : 'text-gray-500'}>{req.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Data Consent */}
                            <div className="flex gap-3 pt-4">
                                <div
                                    className={`w-5 h-5 rounded border mt-1 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${agreeConsent ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}
                                    onClick={() => setAgreeConsent(!agreeConsent)}
                                >
                                    {agreeConsent && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <p className="text-[13px] text-[#222] leading-relaxed">
                                    I agree to the use of my data to receive personalised email advertising from Cars Website (including email analysis), as described in more detail in the <a href="#" className="text-primary-600 underline">Declaration of Consent</a> I may revoke this consent at any time.
                                </p>
                            </div>

                            {/* T&C */}
                            <div className="pt-2">
                                <p className="text-[13px] text-[#222] leading-relaxed">
                                    The Cars Website <a href="#" className="text-primary-600 underline">General Terms and Conditions</a> apply. Information on how your data is processed can be found in the Cars Website <a href="#" className="text-primary-600 underline">Privacy Policy</a>.
                                </p>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={loading}
                                    className="w-full py-4 text-[17px] font-bold shadow-md"
                                >
                                    Register
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginForm;

