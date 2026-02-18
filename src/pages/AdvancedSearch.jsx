import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';

/**
 * Advanced Search Page - Detailed Filters
 * Pixel-perfect reification based on mobile.de detailed search
 */
const AdvancedSearch = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Section 1: Basic Data
    const [make, setMake] = useState('Any');

    const handleSearch = () => {
        navigate('/search');
    };

    const SectionHeader = ({ title }) => (
        <div className="bg-[#EBEDF2] px-6 py-2 border-y border-gray-200">
            <h3 className="text-[15px] font-bold text-[#444] uppercase tracking-wider">{title}</h3>
        </div>
    );

    const FilterLabel = ({ children }) => (
        <label className="block text-[14px] font-bold text-[#222] mb-1.5">{children}</label>
    );

    const Checkbox = ({ id, label }) => (
        <label htmlFor={id} className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" id={id} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-[13px] text-[#444] group-hover:text-primary-600 transition-colors">{label}</span>
        </label>
    );

    const Radio = ({ name, value, label, checked }) => (
        <label className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name={name} value={value} defaultChecked={checked} className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500" />
            <span className="text-[13px] text-[#444] group-hover:text-primary-600 transition-colors">{label}</span>
        </label>
    );

    return (
        <div className="min-h-screen bg-[#F3F5F9] font-sans">
            <Navbar />

            <div className="max-w-[1000px] mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <div className="text-[12px] text-gray-500 mb-1 flex items-center gap-1">
                            <span>Home</span> <span>›</span> <span>Search</span> <span>›</span> <span className="text-gray-900 font-medium italic">Detailed Search</span>
                        </div>
                        <h1 className="text-[28px] font-bold text-[#222]">Detailed Search: <span className="font-normal italic">Cars</span></h1>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="text-[14px] text-primary-600 font-medium hover:underline flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Reset all filters
                        </button>
                        <button
                            onClick={handleSearch}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded text-[16px] font-bold shadow-sm transition-all flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            Show results
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded border border-gray-200 shadow-sm">
                    {/* BASIC DATA */}
                    <SectionHeader title="Basic Data" />
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <FilterLabel>Make</FilterLabel>
                                <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm focus:border-primary-500 outline-none">
                                    <option>Any</option>
                                    <option>Volkswagen</option>
                                    <option>BMW</option>
                                    <option>Mercedes-Benz</option>
                                    <option>Audi</option>
                                </select>
                            </div>
                            <div>
                                <FilterLabel>Model</FilterLabel>
                                <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm focus:border-primary-500 outline-none" disabled>
                                    <option>Any</option>
                                </select>
                            </div>
                            <div>
                                <FilterLabel>Variant</FilterLabel>
                                <input type="text" placeholder="e.g. GTI, M Sport" className="w-full h-9 px-3 border border-gray-300 rounded text-sm focus:border-primary-500 outline-none" />
                            </div>
                        </div>

                        {/* Vehicle Type Checklist */}
                        <div className="space-y-3">
                            <span className="text-[13px] font-bold text-gray-700">Vehicle type</span>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4">
                                {['Saloon', 'Estate car', 'Cabriolet / Roadster', 'Sports car / Coupe', 'SUV / Off-road / Pickup', 'Small car', 'Van / Minibus', 'Other'].map(type => (
                                    <Checkbox key={type} id={type} label={type} />
                                ))}
                            </div>
                        </div>

                        {/* Price, Registration, Mileage */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
                            <div className="space-y-3">
                                <FilterLabel>Price</FilterLabel>
                                <div className="flex items-center gap-2">
                                    <input type="text" placeholder="from" className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none" />
                                    <span className="text-gray-400">to</span>
                                    <input type="text" placeholder="to" className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none" />
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <Radio name="vat" value="gross" label="Gross" checked />
                                    <Radio name="vat" value="net" label="Net" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <FilterLabel>1st Registration</FilterLabel>
                                <div className="flex items-center gap-2">
                                    <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none"><option>from</option></select>
                                    <span className="text-gray-400">to</span>
                                    <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none"><option>to</option></select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <FilterLabel>Mileage</FilterLabel>
                                <div className="flex items-center gap-2">
                                    <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none"><option>up to</option></select>
                                </div>
                            </div>
                        </div>

                        {/* Fuel Type Checklist */}
                        <div className="space-y-3 border-t border-gray-100 pt-6">
                            <span className="text-[13px] font-bold text-gray-700">Fuel type</span>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4">
                                {['Petrol', 'Diesel', 'Electric', 'Hybrid (Petrol)', 'Hybrid (Diesel)', 'LPG', 'CNG', 'Hydrogen', 'Other'].map(fuel => (
                                    <Checkbox key={fuel} id={fuel} label={fuel} />
                                ))}
                            </div>
                        </div>

                        {/* Power & Engine Size */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-100 pt-6">
                            <div className="space-y-3">
                                <FilterLabel>Power</FilterLabel>
                                <div className="flex items-center gap-2">
                                    <input type="text" placeholder="from" className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none" />
                                    <input type="text" placeholder="to" className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none" />
                                    <select className="h-9 px-2 border border-gray-300 rounded text-sm outline-none"><option>hp</option><option>kW</option></select>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <FilterLabel>Engine size (ccm)</FilterLabel>
                                <div className="flex items-center gap-2">
                                    <input type="text" placeholder="from" className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none" />
                                    <input type="text" placeholder="to" className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TECHNICAL DATA */}
                    <SectionHeader title="Technical Data" />
                    <div className="p-6 space-y-8 bg-gray-50/10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <FilterLabel>Number of seats</FilterLabel>
                                    <div className="flex items-center gap-2">
                                        <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none"><option>from</option></select>
                                        <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none"><option>to</option></select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <FilterLabel>Number of doors</FilterLabel>
                                    <div className="flex flex-col gap-2">
                                        <Radio name="doors" value="23" label="2 or 3" />
                                        <Radio name="doors" value="45" label="4 or 5" />
                                        <Radio name="doors" value="67" label="6 or 7" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-x border-gray-100 px-8">
                                <div className="space-y-2">
                                    <FilterLabel>Gearbox</FilterLabel>
                                    <div className="flex flex-col gap-2">
                                        <Checkbox id="gear_manual" label="Manual" />
                                        <Checkbox id="gear_auto" label="Automatic" />
                                        <Checkbox id="gear_semi" label="Semi-automatic" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <FilterLabel>Climatisation</FilterLabel>
                                    <select className="w-full h-9 px-2 border border-gray-300 rounded text-sm outline-none">
                                        <option>Any</option>
                                        <option>Manual or automatic</option>
                                        <option>Automatic climatisation</option>
                                        <option>2-zone</option>
                                        <option>3-zone</option>
                                        <option>4-zone</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <FilterLabel>Trailer coupling</FilterLabel>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Radio name="trailer" value="any" label="Any" checked />
                                        <Radio name="trailer" value="fix" label="Fix" />
                                        <Radio name="trailer" value="detachable" label="Detachable" />
                                        <Radio name="trailer" value="swiveling" label="Swiveling" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <FilterLabel>Parking sensors</FilterLabel>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Checkbox id="park_front" label="Front" />
                                        <Checkbox id="park_rear" label="Rear" />
                                        <Checkbox id="park_cam" label="Camera" />
                                        <Checkbox id="park_360" label="360° Cam" />
                                        <Checkbox id="park_auto" label="Self-steer" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cruise Control, Airbags */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-gray-100">
                            <div className="space-y-2">
                                <FilterLabel>Airbags</FilterLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Front', 'Side', 'Other'].map(a => <Checkbox key={a} id={`airbag_${a}`} label={`${a} airbags`} />)}
                                </div>
                            </div>
                            <div className="space-y-2 border-x border-gray-100 px-8">
                                <FilterLabel>Cruise control</FilterLabel>
                                <div className="flex flex-col gap-2">
                                    <Checkbox id="cc_standard" label="Standard" />
                                    <Checkbox id="cc_adaptive" label="Adaptive" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXTERIOR */}
                    <SectionHeader title="Exterior" />
                    <div className="p-6 space-y-6">
                        <div className="space-y-3">
                            <FilterLabel>Exterior color</FilterLabel>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { name: 'Black', color: 'bg-black' },
                                    { name: 'White', color: 'bg-white border border-gray-300' },
                                    { name: 'Silver', color: 'bg-gray-300' },
                                    { name: 'Grey', color: 'bg-gray-500' },
                                    { name: 'Blue', color: 'bg-blue-600' },
                                    { name: 'Red', color: 'bg-red-600' },
                                    { name: 'Beige', color: 'bg-[#F5F5DC]' },
                                    { name: 'Brown', color: 'bg-[#A52A2A]' },
                                    { name: 'Green', color: 'bg-green-700' },
                                    { name: 'Yellow', color: 'bg-yellow-400' },
                                    { name: 'Orange', color: 'bg-orange-500' },
                                    { name: 'Purple', color: 'bg-purple-600' },
                                    { name: 'Gold', color: 'bg-[#FFD700]' },
                                    { name: 'Bronze', color: 'bg-[#CD7F32]' }
                                ].map(color => (
                                    <div key={color.name} className="flex flex-col items-center gap-1">
                                        <button title={color.name} className={`w-9 h-9 rounded-full ${color.color} border-2 border-transparent hover:border-primary-500 transition-all shadow-sm`}></button>
                                        <span className="text-[10px] text-gray-500">{color.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2">
                                <Checkbox id="metallic" label="Metallic" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-2 border-t border-gray-100 italic text-gray-500">
                            <Checkbox id="alloys" label="Alloy wheels" />
                            <Checkbox id="sunroof" label="Sunroof" />
                            <Checkbox id="panoramic" label="Panoramic roof" />
                            <Checkbox id="towbar" label="Trailer coupling" />
                        </div>
                    </div>

                    {/* INTERIOR */}
                    <SectionHeader title="Interior" />
                    <div className="p-6 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <FilterLabel>Material</FilterLabel>
                                <div className="grid grid-cols-2 gap-y-2">
                                    {['Alcantara', 'Cloth', 'Full leather', 'Part leather', 'Velour', 'Other'].map(m => <Checkbox key={m} id={`mat_${m}`} label={m} />)}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <FilterLabel>Interior color</FilterLabel>
                                <div className="grid grid-cols-2 gap-y-2">
                                    {['Black', 'Brown', 'Beige', 'Grey', 'Other'].map(c => <Checkbox key={c} id={`int_${c}`} label={c} />)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border-t border-gray-100 pt-6">
                            <span className="text-[14px] font-bold text-gray-700">Features</span>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4">
                                {[
                                    'Bluetooth', 'Central locking', 'Electric windows', 'Emergency brake assist',
                                    'Heated seats', 'Isofix', 'Multi-function wheel', 'Navigation system',
                                    'Power steering', 'Rain sensor', 'Touchscreen', 'USB port'
                                ].map(feat => <Checkbox key={feat} id={`feat_${feat}`} label={feat} />)}
                            </div>
                        </div>
                    </div>

                    {/* ENVIRONMENT */}
                    <SectionHeader title="Environment" />
                    <div className="p-6 space-y-6 bg-gray-50/10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <FilterLabel>Emission class</FilterLabel>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Euro 6', 'Euro 5', 'Euro 4', 'Euro 3', 'Euro 2', 'Euro 1'].map(e => <Checkbox key={e} id={e} label={e} />)}
                                </div>
                            </div>
                            <div className="space-y-2 border-x border-gray-100 px-8">
                                <FilterLabel>Particulate filter</FilterLabel>
                                <Checkbox id="filter_yes" label="Yes" />
                            </div>
                            <div className="space-y-2">
                                <FilterLabel>Emission sticker</FilterLabel>
                                <div className="flex flex-col gap-2">
                                    <Radio name="sticker" value="4" label="4 (Green)" />
                                    <Radio name="sticker" value="3" label="3 (Yellow)" />
                                    <Radio name="sticker" value="2" label="2 (Red)" />
                                    <Radio name="sticker" value="none" label="No sticker" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OFFERS */}
                    <SectionHeader title="Offers" />
                    <div className="p-6 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <FilterLabel>Vehicle condition</FilterLabel>
                                <div className="flex flex-col gap-2">
                                    {['New', 'Used', 'Demonstration', 'Employee\'s Car', 'Classic'].map(v => <Checkbox key={v} id={v} label={v} />)}
                                </div>
                            </div>
                            <div className="space-y-2 border-x border-gray-100 px-8">
                                <FilterLabel>Seller</FilterLabel>
                                <div className="flex flex-col gap-2">
                                    <Radio name="seller" value="any" label="Any" checked />
                                    <Radio name="seller" value="dealer" label="Dealer" />
                                    <Radio name="seller" value="private" label="Private seller" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <FilterLabel>Service history</FilterLabel>
                                <div className="flex flex-col gap-2">
                                    <Checkbox id="service_full" label="Full service history" />
                                    <Checkbox id="new_service" label="New service" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats & Action */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white rounded border border-gray-200">
                    <div className="text-[15px] font-medium text-gray-700">
                        Total Cars Found: <span className="font-bold text-primary-600">1,401,487</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="text-gray-500 font-medium hover:text-gray-900 px-4"
                        >
                            Reset all filters
                        </button>
                        <button
                            onClick={handleSearch}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-16 py-4 rounded text-lg font-bold shadow-lg transition-all active:scale-95 flex items-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            Show Results
                        </button>
                    </div>
                </div>

            </div>

            {/* Minimal Footer */}
            <div className="bg-[#1D1F24] text-white py-12">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="flex justify-center gap-8 mb-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Conditions of Use</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Imprint</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <p className="text-gray-500 text-[12px]">© 2024 charles.car Marketplace. Reified mobile.de detailed search interface.</p>
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearch;
