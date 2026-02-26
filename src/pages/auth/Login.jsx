import Navbar from '../../components/layout/Navbar';
import LoginForm from '../../components/auth/LoginForm';

/**
 * Login Page
 * Redesigned based on mobile.de styling with website theme
 */

const Login = () => {
    return (
        <div className="min-h-screen bg-[#EBEDF3] font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-start justify-center gap-12 lg:gap-20">
                {/* Left Column: Form Card */}
                <div className="w-full max-w-[440px]">
                    <LoginForm />
                </div>

                {/* Right Column: Advantages */}
                <div className="hidden md:block max-w-[420px] pt-12">
                    <h2 className="text-2xl font-bold text-[#222] mb-6 leading-tight">
                        Your advantages with a Cars Website account
                    </h2>

                    <ul className="space-y-5">
                        {[
                            'Parked vehicles available everywhere',
                            'Save searches',
                            'Always get the latest deals'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 w-5 h-5 text-green-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-[15px] text-[#444] font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            {/* Sub-footer text */}
            <div className="text-center pb-8 mt-4 md:mt-0">
                <p className="text-sm text-gray-600">
                    Are you a dealer? <a href="#" className="text-primary-600 hover:underline">Go to Dealer login</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

