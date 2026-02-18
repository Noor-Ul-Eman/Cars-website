import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSellOpen, setIsSellOpen] = useState(false);
    const [isInformOpen, setIsInformOpen] = useState(false);
    const searchRef = useRef(null);
    const sellRef = useRef(null);
    const informRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
            if (sellRef.current && !sellRef.current.contains(event.target)) {
                setIsSellOpen(false);
            }
            if (informRef.current && !informRef.current.contains(event.target)) {
                setIsInformOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsSellOpen(false);
        setIsInformOpen(false);
    };

    const toggleSell = () => {
        setIsSellOpen(!isSellOpen);
        setIsSearchOpen(false);
        setIsInformOpen(false);
    };

    const toggleInform = () => {
        setIsInformOpen(!isInformOpen);
        setIsSearchOpen(false);
        setIsSellOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-20 h-16">
                    {/* Left: Logo & Slogan */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <h1 className="text-3xl font-black bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent cursor-pointer tracking-tighter" onClick={() => navigate('/')} style={{ fontFamily: 'Inter, sans-serif' }}>
                            Charles.car
                        </h1>

                        <div className="hidden lg:block pl-1">
                            <p className="text-[10px] font-bold text-gray-500 leading-tight w-[120px]">
                                Switzerland's biggest<br />vehicle marketplace
                            </p>
                        </div>
                    </div>

                    {/* Center: Links */}
                    <div className="hidden md:flex gap-8 items-center h-full">
                        {/* Search Dropdown */}
                        <div className="relative h-full flex items-center" ref={searchRef}>
                            <div
                                className={`cursor-pointer flex items-center gap-1 font-medium py-5 transition-colors ${isSearchOpen ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                                onClick={toggleSearch}
                            >
                                {t('navbar.buy') || 'Search'}
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isSearchOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Search Mega Menu */}
                            {isSearchOpen && (
                                <div className="absolute top-full -left-[400px] w-[900px] bg-white shadow-2xl rounded-xl p-8 z-50 border border-gray-100 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-3 gap-12">
                                        {/* Column 1: Leasing */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Leasing</h3>
                                            <div className="group/card cursor-pointer">
                                                <div className="overflow-hidden rounded-lg mb-3 h-32 relative">
                                                    <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80" alt="Leasing" className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-300" />
                                                    <div className="absolute inset-0 bg-black/5 group-hover/card:bg-black/0 transition-colors"></div>
                                                </div>
                                                <a href="#" className="text-gray-600 font-medium hover:text-primary-600 flex items-center gap-1 transition-colors">
                                                    Lease a car
                                                </a>
                                            </div>
                                        </div>

                                        {/* Column 2: Vehicle search */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Vehicle search</h3>
                                            <ul className="space-y-4 text-[15px] font-medium text-gray-800">
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Used & New Cars</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Electric cars</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Motorcycles</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">E-Bikes</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Motorhomes & Caravans</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Trucks, Commercial & Utility Vehicles</a></li>
                                            </ul>
                                        </div>

                                        {/* Column 3: Services */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Services</h3>
                                            <ul className="space-y-4 text-[15px] font-medium text-gray-800">
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Leasing offers</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Dealer search</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sell Dropdown */}
                        <div className="relative h-full flex items-center" ref={sellRef}>
                            <div
                                className={`cursor-pointer flex items-center gap-1 font-medium py-5 transition-colors ${isSellOpen ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                                onClick={toggleSell}
                            >
                                {t('navbar.sell') || 'Sell'}
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isSellOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Sell Mega Menu */}
                            {isSellOpen && (
                                <div className="absolute top-full -left-[400px] w-[900px] bg-white shadow-2xl rounded-xl p-8 z-50 border border-gray-100 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-3 gap-12">
                                        {/* Column 1: Car valuation */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Car valuation</h3>
                                            <div className="group/card cursor-pointer">
                                                <div className="overflow-hidden rounded-lg mb-3 h-32 relative">
                                                    <img src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80" alt="Car valuation" className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-300" />
                                                    <div className="absolute inset-0 bg-black/5 group-hover/card:bg-black/0 transition-colors"></div>
                                                </div>
                                                <a href="#" className="text-gray-600 font-medium hover:text-primary-600 transition-colors">Learn more</a>
                                            </div>
                                        </div>

                                        {/* Column 2: Private and Commercial */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Private and Commercial</h3>
                                            <ul className="space-y-4 text-[15px] font-medium text-gray-800">
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Car</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Motorcycles</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Motorhomes & Caravans</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Trucks, Commercial & Utility Vehicles</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Car valuation</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Car selling tips</a></li>
                                            </ul>
                                        </div>

                                        {/* Column 3: Professional Domain */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Professional Domain</h3>
                                            <ul className="space-y-4 text-[15px] font-medium text-gray-800">
                                                <li><a href="#" className="hover:text-primary-600 transition-colors font-bold">Registration</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors font-bold">Our Offer</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Inform Dropdown */}
                        <div className="relative h-full flex items-center" ref={informRef}>
                            <div
                                className={`cursor-pointer flex items-center gap-1 font-medium py-5 transition-colors ${isInformOpen ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                                onClick={toggleInform}
                            >
                                {t('navbar.inform') || 'Inform'}
                                <svg className={`w-4 h-4 transition-transform duration-200 ${isInformOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>

                            {/* Inform Mega Menu */}
                            {isInformOpen && (
                                <div className="absolute top-full -left-[400px] w-[900px] bg-white shadow-2xl rounded-xl p-8 z-50 border border-gray-100 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-3 gap-12">
                                        {/* Column 1: Electro mobility */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Electro mobility</h3>
                                            <div className="group/card cursor-pointer">
                                                <div className="overflow-hidden rounded-lg mb-3 h-32 relative">
                                                    <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=400&q=80" alt="Electro mobility" className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-300" />
                                                    <div className="absolute inset-0 bg-black/5 group-hover/card:bg-black/0 transition-colors"></div>
                                                </div>
                                                <a href="#" className="text-gray-600 font-medium hover:text-primary-600 transition-colors">Learn more</a>
                                            </div>
                                        </div>

                                        {/* Column 2: Knowledge */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Knowledge</h3>
                                            <ul className="space-y-4 text-[15px] font-medium text-gray-800">
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Car-Magazine</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Guide and Service</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Topics A-Z</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Trust and Safety Center</a></li>
                                            </ul>
                                        </div>

                                        {/* Column 3: Guide */}
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Guide</h3>
                                            <ul className="space-y-4 text-[15px] font-medium text-gray-800">
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Makes & Models</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Leaderboards & Tests</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Brand Portal</a></li>
                                                <li><a href="#" className="hover:text-primary-600 transition-colors">Electric Car Guide & Tips</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Icons & Login */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-3 text-gray-500">
                            <button className="hover:text-primary-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </button>
                            <button className="hover:text-primary-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
                            </button>
                            <button className="hover:text-primary-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </button>
                        </div>

                        <div className="h-6 w-px bg-gray-300 mx-1"></div>

                        <LanguageSwitcher />

                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate('/login')}
                            className="bg-primary-600 hover:bg-primary-700 text-white border-none"
                        >
                            {t('navbar.signIn') || 'Login'}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
