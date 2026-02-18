import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import CustomSelect from '../components/common/CustomSelect';

/**
 * Home Page - Car Marketplace Landing Page
 * Complete redesign based on user feedback
 */

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Animation State
    const [placeholder, setPlaceholder] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Filter State
    const [selectedMake, setSelectedMake] = useState('Any');
    const [selectedModel, setSelectedModel] = useState('Any');
    const [selectedYear, setSelectedYear] = useState('Any');
    const [selectedMileage, setSelectedMileage] = useState('Any');
    const [selectedPrice, setSelectedPrice] = useState('Any');
    const [selectedCity, setSelectedCity] = useState('Any');
    const [selectedPayment, setSelectedPayment] = useState('Buy'); // Default to Buy
    const [isElectric, setIsElectric] = useState(false);

    const makes = [
        "Abarth", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Cadillac", "Chevrolet", "Chrysler",
        "Citroen", "Cupra", "Dacia", "Dodge", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Jaguar", "Jeep",
        "Kia", "Lamborghini", "Land Rover", "Lexus", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz",
        "Mini", "Mitsubishi", "Nissan", "Opel", "Peugeot", "Polestar", "Porsche", "Renault", "Rolls-Royce",
        "Seat", "Skoda", "Smart", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"
    ];

    const modelsByMake = {
        "Audi": ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "e-tron", "TT", "R8"],
        "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "i7", "iX", "M2", "M3", "M4", "M5"],
        "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "EQA", "EQB", "EQE", "EQS", "SL", "G-Class", "AMG GT"],
        "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Roadster", "Cybertruck"],
        "Volkswagen": ["Polo", "Golf", "ID.3", "ID.4", "ID.5", "ID.7", "ID. Buzz", "Passat", "Arteon", "T-Roc", "Tiguan", "Touareg", "Touran"],
        "Porsche": ["718 Boxster", "718 Cayman", "911", "Taycan", "Panamera", "Macan", "Cayenne"],
        "Toyota": ["Aygo X", "Yaris", "Corolla", "Camry", "GR86", "GR Supra", "C-HR", "bZ4X", "RAV4", "Highlander", "Land Cruiser", "Hilux", "Prius"],
        "Ford": ["Ka+", "Fiesta", "Focus", "Mondeo", "Mustang", "Mustang Mach-E", "Puma", "EcoSport", "Kuga", "Explorer", "Ranger"],
        "Honda": ["Jazz", "Civic", "HR-V", "ZR-V", "CR-V", "Honda e", "e:Ny1", "NSX"],
        "Hyundai": ["i10", "i20", "i30", "IONIQ 5", "IONIQ 6", "KONA", "TUCSON", "SANTA FE", "BAYON", "NEXO"],
        "Kia": ["Picanto", "Rio", "Ceed", "EV6", "EV9", "Niro", "Sportage", "Sorento", "Stinger"],
        "Volvo": ["EX30", "XC40", "C40", "XC60", "XC90", "S60", "V60", "S90", "V90"],
        "Mazda": ["Mazda2", "Mazda3", "Mazda6", "CX-30", "CX-5", "CX-60", "MX-30", "MX-5"],
        "Nissan": ["Micra", "Juke", "Qashqai", "X-Trail", "Ariya", "Leaf", "GT-R", "Z"],
        "Ferrari": ["296 GTB", "SF90 Stradale", "F8 Tributo", "812 Superfast", "Roma", "Portofino M", "Purosangue"],
        "Lamborghini": ["Huracán", "Aventador", "Revuelto", "Urus"],
    };

    const registrationYears = [
        "Any", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016",
        "2015", "2014", "2013", "2012", "2011", "2010", "2005", "2000", "1995", "1990", "1980", "1970", "1960"
    ];

    const mileageOptions = [
        "5,000 km", "10,000 km", "20,000 km", "30,000 km", "40,000 km", "50,000 km",
        "60,000 km", "70,000 km", "80,000 km", "90,000 km", "100,000 km", "125,000 km",
        "150,000 km", "175,000 km", "200,000 km", "250,000 km", "300,000 km", "400,000 km", "500,000 km"
    ];

    const priceOptions = [
        "500", "1,000", "2,000", "3,000", "4,000", "5,000", "7,500", "10,000", "12,500", "15,000",
        "17,500", "20,000", "25,000", "30,000", "35,000", "40,000", "45,000", "50,000", "60,000",
        "70,000", "80,000", "90,000", "100,000", "125,000", "150,000", "175,000", "200,000",
        "250,000", "300,000", "400,000", "500,000", "750,000", "1,000,000"
    ];

    const cities = [
        "Zurich", "Geneva", "Basel", "Lausanne", "Bern", "Winterthur", "Lucerne", "St. Gallen",
        "Lugano", "Biel/Bienne", "Thun", "Köniz", "La Chaux-de-Fonds", "Fribourg", "Schaffhausen",
        "Chur", "Vernier", "Neuchâtel", "Uster", "Sion", "Lancy", "Emmen", "Yverdon-les-Bains",
        "Zug", "Dübendorf", "Kriens", "Dietikon", "Rapperswil-Jona", "Montreux", "Frauenfeld", "Wetzikon"
    ];

    const paymentTypes = ["Buy", "Lease", "Financing", "Subscription"];

    const handleMakeChange = (e) => {
        const make = e.target.value;
        setSelectedMake(make);
        setSelectedModel('Any'); // Reset model when make changes
    };

    const handleSearch = () => {
        // Navigate to search page with current placeholder text or default
        navigate('/search', {
            state: {
                query: placeholder
            }
        });
    };

    const handleReset = () => {
        setSelectedMake('Any');
        setSelectedModel('Any');
        setSelectedYear('Any');
        setSelectedMileage('Any');
        setSelectedPrice('Any');
        setSelectedCity('Any');
        setSelectedPayment('Buy');
        setIsElectric(false);
        setPlaceholder('');
        setLoopNum(0);
        setIsDeleting(false);
    };

    const phrases = ["Electric SUV with long range", "VW ID.4 up to €35,000 and 50,000 km", "Station wagon with panoramic roof and heated seats", "Convertible"];

    useEffect(() => {
        if (isFocused) return;

        const handleType = () => {
            const i = loopNum % phrases.length;
            const fullText = phrases[i];

            setPlaceholder(isDeleting
                ? fullText.substring(0, placeholder.length - 1)
                : fullText.substring(0, placeholder.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && placeholder === fullText) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && placeholder === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [placeholder, isDeleting, isFocused, loopNum, typingSpeed]);

    const vehicleCategories = [
        { name: t('home.categories.cars'), icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', count: '2.5M+' },
        { name: t('home.categories.electric'), icon: 'M13 10V3L4 14h7v7l9-11h-7z', count: '150K+' },
        { name: t('home.categories.motorcycles'), icon: 'M12 18.5A2.5 2.5 0 019.5 16 2.5 2.5 0 0112 13.5a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5M4.5 19.5a3 3 0 100-6 3 3 0 000 6m15 0a3 3 0 100-6 3 3 0 000 6M12 3l-1.5 5h3L12 3z', count: '80K+' },
        { name: t('home.categories.trucks'), icon: 'M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z', count: '45K+' },
        { name: t('home.categories.motorhomes'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', count: '12K+' },
        { name: t('home.categories.caravans'), icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z', count: '8K+' },
    ];

    const featuredCars = [
        { id: 1, name: 'BMW 3 Series', year: 2023, price: '€45,900', mileage: '12,500 km', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' },
        { id: 2, name: 'Mercedes-Benz C-Class', year: 2024, price: '€52,500', mileage: '5,200 km', fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400' },
        { id: 3, name: 'Audi A4', year: 2023, price: '€42,300', mileage: '18,900 km', fuel: 'Diesel', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400' },
        { id: 4, name: 'Tesla Model 3', year: 2024, price: '€48,900', mileage: '8,100 km', fuel: 'Electric', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[600px] w-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
                        alt="Background Car"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white pb-32">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Find your <span className="text-primary-400">dream car</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8">
                        Search through thousands of verified vehicles from trusted dealers.
                    </p>
                    <button className="w-fit bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                        Start Browsing
                    </button>
                </div>

                {/* Simple Search Box - Overlapping bottom edge */}
                <div className="font-sans absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-20">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 h-64 flex flex-col justify-center">

                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-4xl font-medium text-gray-900 tracking-tight leading-tight">
                                Millions of cars. One simple search.
                            </h2>
                        </div>

                        <div className="relative max-w-4xl mx-auto w-full">
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>

                            <input
                                type="text"
                                className="w-full h-18 pl-16 pr-20 text-lg font-normal text-gray-800 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-gray-300 transition-all shadow-sm placeholder-gray-500 italic"
                                placeholder={isFocused ? "Tell us what car do you want" : placeholder}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />

                            <button
                                className="absolute inset-y-2.5 right-2.5 bg-primary-600 hover:bg-primary-700 text-white w-14 rounded-xl flex items-center justify-center transition-colors shadow-md cursor-pointer"
                                onClick={handleSearch}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-8 flex justify-center items-center gap-3 text-sm text-gray-600">
                            <span className="bg-[#E9ECEF] px-2.5 py-0.5 rounded font-bold text-gray-700 text-[10px] border border-gray-200 uppercase">
                                Beta
                            </span>
                            <span className="font-normal text-gray-600">AI-Search. Cars only.</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Detailed Filter Section - Below the hero overlap */}
            <div className="pt-48 pb-24 bg-[#F3F5F9]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 h-auto md:h-72">
                        {/* Sidebar - Vehicle Types */}
                        <div className="w-full md:w-20 bg-[#F8F9FA] flex md:flex-col border-b md:border-b-0 md:border-r border-gray-100">
                            {[
                                { id: 'car', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', active: true },
                                { id: 'bike', icon: 'M12 18.5A2.5 2.5 0 019.5 16 2.5 2.5 0 0112 13.5a2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5M4.5 19.5a3 3 0 100-6 3 3 0 000 6m15 0a3 3 0 100-6 3 3 0 000 6M12 3l-1.5 5h3L12 3z' },
                                { id: 'ebike', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                                { id: 'motorhome', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                                { id: 'truck', icon: 'M8 17a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zM3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    className={`flex-1 md:flex-none h-14 md:h-1/5 flex items-center justify-center transition-all duration-200 border-b border-gray-100 last:border-0 cursor-pointer ${item.active ? 'bg-white shadow-[inset_4px_0_0_0_#0284c7]' : 'hover:bg-blue-50'}`}
                                >
                                    <svg className={`w-8 h-8 transition-colors ${item.active ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={item.icon} />
                                    </svg>
                                </button>
                            ))}
                        </div>

                        {/* Filter Content */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {/* Make Field */}
                                <CustomSelect
                                    label="Make"
                                    value={selectedMake}
                                    options={makes}
                                    onChange={(e) => {
                                        setSelectedMake(e.target.value);
                                        setSelectedModel('Any');
                                    }}
                                    placeholder="Any"
                                />

                                {/* Model Field */}
                                <CustomSelect
                                    label="Model"
                                    value={selectedModel}
                                    options={selectedMake !== 'Any' ? (modelsByMake[selectedMake] || []) : []}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    placeholder="Any"
                                    disabled={selectedMake === 'Any'}
                                />

                                {/* 1st Registration Field */}
                                <CustomSelect
                                    label="1st Registration from"
                                    value={selectedYear}
                                    options={registrationYears.filter(y => y !== 'Any')}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    placeholder="Any"
                                />

                                {/* Mileage Field */}
                                <CustomSelect
                                    label="Mileage up to"
                                    value={selectedMileage}
                                    options={mileageOptions}
                                    onChange={(e) => setSelectedMileage(e.target.value)}
                                    placeholder="Any"
                                />
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end mt-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-800">Payment type</label>
                                    <div className="flex border-2 border-primary-600 rounded-lg overflow-hidden h-11 bg-white">
                                        <button
                                            onClick={() => setSelectedPayment('Buy')}
                                            className={`flex-1 font-bold text-sm md:text-base transition-colors cursor-pointer ${selectedPayment === 'Buy' ? 'bg-primary-600 text-white' : 'text-primary-700 hover:bg-gray-50'}`}
                                        >
                                            Buy
                                        </button>
                                        <button
                                            onClick={() => setSelectedPayment('Lease')}
                                            className={`flex-1 font-normal text-sm md:text-base border-l border-gray-200 transition-colors cursor-pointer ${selectedPayment === 'Lease' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            Leasing
                                        </button>
                                    </div>
                                </div>

                                <CustomSelect
                                    label="Price up to"
                                    value={selectedPrice}
                                    options={priceOptions.map(p => `€ ${p}`)}
                                    onChange={(e) => setSelectedPrice(e.target.value.replace('€ ', ''))}
                                    placeholder="Any"
                                />

                                <CustomSelect
                                    label="City"
                                    value={selectedCity}
                                    options={cities}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    placeholder="Any"
                                />

                                <button
                                    onClick={handleSearch}
                                    className="h-11 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-base rounded-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    1,401,487 Offers
                                </button>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={isElectric}
                                            onChange={() => setIsElectric(!isElectric)}
                                        />
                                        <div className={`w-5 h-5 bg-white rounded border transition-all flex items-center justify-center ${isElectric ? 'border-primary-600' : 'border-gray-300'}`}>
                                            <svg className={`w-3.5 h-3.5 text-primary-600 transition-opacity ${isElectric ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm md:text-base transition-colors">Only Electric Cars <span className="inline-flex items-center justify-center w-5 h-5 bg-primary-600 text-white rounded-md text-[10px] ml-1">⚡</span></span>
                                </label>

                                <div className="flex items-center gap-8">
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-1.5 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => navigate('/advanced-search')}
                                        className="flex items-center gap-1.5 text-base font-medium text-gray-700 hover:text-primary-600 transition-colors cursor-pointer group"
                                    >
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        More filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('home.categories.title')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {vehicleCategories.map((category, index) => (
                        <button
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-primary-500 group"
                        >
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="bg-primary-50 group-hover:bg-primary-500 p-4 rounded-full transition-colors">
                                    <svg className="w-8 h-8 text-primary-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{category.name}</p>
                                    <p className="text-sm text-gray-500">{category.count}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Vehicles */}
            <div className="bg-white py-16 clip-path-slant-inv">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-900">Featured Vehicles</h3>
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All →
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredCars.map((car) => (
                            <div key={car.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 group cursor-pointer">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Featured
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{car.name}</h4>
                                    <p className="text-2xl font-bold text-primary-600 mb-3">{car.price}</p>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{car.year}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>{car.mileage}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                            <span>{car.fuel}</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h5 className="font-bold text-lg mb-4">Cars Hub</h5>
                            <p className="text-gray-400 text-sm">Your trusted car marketplace</p>
                        </div>
                        <div>
                            <h6 className="font-semibold mb-4">Company</h6>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="font-semibold mb-4">Support</h6>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="font-semibold mb-4">Follow Us</h6>
                            <div className="flex gap-4">
                                {/* Social icons - simplified */}
                                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full"></a>
                                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full"></a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2024 Cars Hub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
