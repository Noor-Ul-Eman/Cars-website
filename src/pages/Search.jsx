import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

/**
 * Search Results Page
 * Displays vehicle listings based on search criteria
 */

const Search = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    // Get search params from state or default values
    const [filters, setFilters] = useState(location.state || {
        make: '',
        model: '',
        priceFrom: '',
        priceTo: '',
        yearFrom: '',
    });

    // Mock data for search results
    const mockListings = [
        {
            id: 1,
            make: 'BMW',
            model: '3 Series',
            variant: '320d M Sport',
            year: 2023,
            price: 45900,
            mileage: 12500,
            fuel: 'Diesel',
            transmission: 'Automatic',
            power: '190 hp',
            location: 'Berlin, Germany',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
            seller: 'Dealer',
            rating: 4.8,
        },
        {
            id: 2,
            make: 'Mercedes-Benz',
            model: 'C-Class',
            variant: 'C 220 d',
            year: 2024,
            price: 52500,
            mileage: 5200,
            fuel: 'Petrol',
            transmission: 'Automatic',
            power: '200 hp',
            location: 'Munich, Germany',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
            seller: 'Private',
            rating: 4.5,
        },
        {
            id: 3,
            make: 'Audi',
            model: 'A4',
            variant: '40 TDI quattro',
            year: 2023,
            price: 42300,
            mileage: 18900,
            fuel: 'Diesel',
            transmission: 'Automatic',
            power: '204 hp',
            location: 'Hamburg, Germany',
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
            seller: 'Dealer',
            rating: 4.9,
        },
        {
            id: 4,
            make: 'Tesla',
            model: 'Model 3',
            variant: 'Long Range',
            year: 2024,
            price: 48900,
            mileage: 8100,
            fuel: 'Electric',
            transmission: 'Automatic',
            power: '498 hp',
            location: 'Frankfurt, Germany',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400',
            seller: 'Dealer',
            rating: 4.7,
        },
        {
            id: 5,
            make: 'Volkswagen',
            model: 'Golf',
            variant: 'GTI',
            year: 2022,
            price: 32500,
            mileage: 25400,
            fuel: 'Petrol',
            transmission: 'Manual',
            power: '245 hp',
            location: 'Cologne, Germany',
            image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400',
            seller: 'Private',
            rating: 4.6,
        },
    ];

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            // Filter logic would go here in a real app
            setListings(mockListings);
            setLoading(false);
        }, 800);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Search Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                Cars Hub
                            </h1>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <p className="text-sm text-gray-500">
                                {t('search.vehiclesFound', { count: listings.length })}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">{t('search.saveSearch')}</Button>
                            <Button variant="primary" size="sm">{t('search.sortBy')}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">{t('search.filters.title')}</h3>
                                <button
                                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                                    onClick={() => setFilters({
                                        make: '',
                                        model: '',
                                        priceFrom: '',
                                        priceTo: '',
                                        yearFrom: '',
                                    })}
                                >
                                    {t('search.filters.reset')}
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('search.filters.make')}</label>
                                    <select
                                        name="make"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={filters.make}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">All Makes</option>
                                        <option value="bmw">BMW</option>
                                        <option value="mercedes">Mercedes-Benz</option>
                                        <option value="audi">Audi</option>
                                        <option value="volkswagen">Volkswagen</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('search.filters.priceRange')}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select
                                            name="priceFrom"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            value={filters.priceFrom}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Min</option>
                                            <option value="5000">€5,000</option>
                                            <option value="10000">€10,000</option>
                                        </select>
                                        <select
                                            name="priceTo"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            value={filters.priceTo}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Max</option>
                                            <option value="20000">€20,000</option>
                                            <option value="50000">€50,000</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('search.filters.yearFrom')}</label>
                                    <select
                                        name="yearFrom"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        value={filters.yearFrom}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Any Year</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('search.filters.fuel')}</label>
                                    <div className="space-y-2">
                                        {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((fuel) => (
                                            <label key={fuel} className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                                <span className="ml-2 text-sm text-gray-600">{fuel}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full mt-4" variant="primary">
                                    {t('search.filters.apply')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Listings Grid */}
                    <div className="w-full lg:w-3/4">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                                <p className="mt-4 text-gray-600">{t('search.loading')}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {listings.map((car) => (
                                    <div key={car.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
                                        {/* Image */}
                                        <div className="w-full md:w-1/3 relative">
                                            <img
                                                src={car.image}
                                                alt={`${car.make} ${car.model}`}
                                                className="w-full h-48 md:h-full object-cover"
                                            />
                                            <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                            {car.make} {car.model} {car.variant}
                                                        </h2>
                                                        <p className="text-sm text-gray-500">{car.location}</p>
                                                    </div>
                                                    <p className="text-2xl font-bold text-orange-600">
                                                        €{car.price.toLocaleString()}
                                                    </p>
                                                </div>

                                                {/* Specs Grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4 mt-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {car.year} (Reg)
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        {car.mileage.toLocaleString()} km
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                        </svg>
                                                        {car.fuel}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                        </svg>
                                                        {car.power}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium uppercase tracking-wide">
                                                        {car.seller}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <span className="text-yellow-400">★</span>
                                                        <span className="font-medium">{car.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button className="text-gray-500 hover:text-gray-900 font-medium text-sm px-4 py-2">
                                                        {t('search.park')}
                                                    </button>
                                                    <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                                                        {t('search.contactSeller')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                <div className="flex justify-center mt-8">
                                    <nav className="flex items-center gap-2">
                                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                                            {t('search.pagination.previous')}
                                        </button>
                                        <button className="w-10 h-10 bg-orange-600 text-white rounded-lg font-medium">1</button>
                                        <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-600">2</button>
                                        <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-600">3</button>
                                        <span className="text-gray-400">...</span>
                                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                            {t('search.pagination.next')}
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
