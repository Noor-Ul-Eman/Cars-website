import { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ label, value, options, onChange, placeholder = "Any", disabled = false, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange({ target: { value: option } });
        setIsOpen(false);
    };

    return (
        <div className="space-y-1.5 w-full relative" ref={dropdownRef}>
            {label && <label className="text-sm font-bold text-gray-800">{label}</label>}
            <div className="relative group">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`w-full h-11 px-3 bg-[#EEF0F5] border border-gray-300 rounded-lg text-sm md:text-base text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-medium italic transition-all ${disabled ? 'cursor-not-allowed opacity-60 text-gray-400' : 'text-gray-700 cursor-pointer shadow-sm hover:border-gray-400'}`}
                >
                    <span className="truncate">{value === 'Any' ? placeholder : value}</span>
                    <div className="flex items-center">
                        <div className="h-8 w-px bg-gray-300 mx-2"></div>
                        <svg className={`w-4 h-4 md:w-5 md:h-5 text-gray-700 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <div className="py-1">
                            <div
                                onClick={() => handleSelect('Any')}
                                className={`px-4 py-2 text-sm md:text-base cursor-pointer transition-colors ${value === 'Any' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-primary-600 hover:text-white'}`}
                            >
                                Any
                            </div>
                            {options.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className={`px-4 py-2 text-sm md:text-base cursor-pointer transition-colors ${value === option ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-primary-600 hover:text-white'}`}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
