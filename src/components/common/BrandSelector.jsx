import { useState, useRef, useEffect } from 'react';

const BrandSelector = ({ label, value, onChange, placeholder = "Any", vehicleType = "car" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [excludeMode, setExcludeMode] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [modelSearchTerm, setModelSearchTerm] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [selectedItems, setSelectedItems] = useState({ brand: null, model: null });
    const [lastSearched, setLastSearched] = useState([]);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const getBrandModels = (brandName) => {
        const models = {
            // Car brands
            'AC': ['Cobra', 'Ace', 'Aceca'],
            'Acura': ['MDX', 'RDX', 'TLX', 'ILX'],
            'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale', 'Giulietta'],
            'Aston Martin': ['DB11', 'DBX', 'Vantage', 'DBS'],
            'Audi': ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'e-tron', 'TT', 'R8'],
            'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX'],
            'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'EQA', 'EQB', 'EQE', 'EQS'],
            'Volkswagen': ['Polo', 'Golf', 'ID.3', 'ID.4', 'ID.5', 'Passat', 'Tiguan', 'Touareg'],
            'Toyota': ['Yaris', 'Corolla', 'Camry', 'RAV4', 'Highlander', 'Land Cruiser', 'Prius'],
            'Ford': ['Fiesta', 'Focus', 'Mustang', 'Puma', 'Kuga', 'Explorer'],
            'Porsche': ['911', 'Taycan', 'Panamera', 'Macan', 'Cayenne'],
            'Skoda': ['Fabia', 'Octavia', 'Superb', 'Kodiaq', 'Karoq'],
            'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'V60'],
            'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Scenic'],
            'Fiat': ['500', 'Panda', 'Tipo', '500X'],
            'Seat': ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
            
            // Motorhome brands
            'ACTION MOBILE': ['Actimo', 'Actimo One', 'Actimo Two'],
            'ADRIA': ['Compact', 'Matrix', 'Twin', 'Sonic', 'Coral', 'Adora', 'Alpina', 'Astella'],
            'ADVENTURER': ['Eagle', 'Hawk', 'Falcon'],
            'AERO ONE': ['Compact', 'Family', 'Luxury'],
            'AERO PLAST': ['Classic', 'Modern', 'Premium'],
            'MAPLE': ['Maple 1', 'Maple 2', 'Maple 3', 'Maple 4'],
            'AIRSTREAM': ['Basecamp', 'Bambi', 'Caravel', 'Flying Cloud', 'International', 'Classic'],
            'ARCA': ['America', 'Europa', 'New Zealand', 'Camper'],
            'AUTOSTAR': ['Atelier', 'Passion', 'Prestige', 'Privilege'],
            'BENIMAR': ['Benivan', 'Mileo', 'Tessoro', 'Amphitryon', 'Perseo'],
            'BÜRSTNER': ['Campeo', 'City Car', 'Ixeo', 'Lyseo', 'Nexxo', 'Premio'],
            'CARADO': ['Banff', 'Axion', 'Vlow', 'T-Series'],
            'CARTHAGO': ['Chic', 'Liner', 'Malibu', 'C-Tourer', 'E-Line'],
            'CHAUSSON': ['Flash', 'Titanium', 'Welcome', 'Twist'],
            'CI': ['Magis', 'Elliot', 'Horon', 'Kyros'],
            'CONCORDE': ['Credo', 'Cruiser', 'Charisma', 'Carver'],
            'DETHLEFFS': ['Globebus', 'Globetrotter', 'Trend', 'Advantage', 'Pulse'],
            'ELNAGH': ['Baron', 'Duke', 'King', 'Prince'],
            'EURA MOBIL': ['Activa', 'Contura', 'Integra', 'Profila', 'Terrestra'],
            'FENDT': ['Bianco', 'Opal', 'Saphir', 'Diamant'],
            'FIAT': ['Ducato', 'Talento', 'Doblo'],
            'FORD': ['Transit', 'Nugget', 'Custom'],
            'FRANKIA': ['I-Series', 'M-Series', 'T-Series', 'A-Series'],
            'HOBBY': ['Optima', 'Siesta', 'Premium', 'Vantana', 'Beachy'],
            'HYMER': ['B-Class', 'T-Class', 'S-Class', 'Exsis', 'ML-T'],
            'ITINEO': ['SB', 'MB', 'PB', 'JB'],
            'KNAUS': ['BoxStar', 'BoxLife', 'Live Wave', 'Sky Wave', 'Sun Ti'],
            'LAIKA': ['Ecovip', 'Kosmo', 'Kreos'],
            'LMC': ['Breezer', 'Cruiser', 'Explorer', 'Liberty'],
            'MCLOUIS': ['Fusion', 'Menfys', 'Nevis', 'Tandy'],
            'MERCEDES-BENZ': ['Marco Polo', 'Sprinter', 'Vito'],
            'MOBILVETTA': ['K-Yacht', 'K-Silver', 'Eureka'],
            'NIESMANN+BISCHOFF': ['Arto', 'Flair', 'Smove'],
            'PILOTE': ['Galaxy', 'Pacific', 'Aventura', 'Explorateur'],
            'PÖSSL': ['Roadcruiser', 'Roadcamp', 'Summit', 'Vanster'],
            'RAPIDO': ['Serie 6', 'Serie 7', 'Serie 8', 'Serie 9', 'Distinction'],
            'RIMOR': ['Seal', 'Katamarano', 'Europeo', 'Hype'],
            'ROLLER TEAM': ['Zefiro', 'Kronos', 'Pegaso', 'Livingstone'],
            'SEA': ['Classic', 'Modern', 'Premium'],
            'SUNLIGHT': ['T-Series', 'A-Series', 'V-Series', 'Cliff'],
            'TRIGANO': ['Tribute', 'Olympe', 'Challenger'],
            'WEINSBERG': ['CaraCore', 'CaraBus', 'CaraSuite', 'CaraOne'],
            'WESTFALIA': ['Sven Hedin', 'Amundsen', 'Columbus', 'Kepler'],
            
            // Commercial Vehicle brands
            'Citroën': ['Berlingo', 'Jumpy', 'Jumper', 'SpaceTourer'],
            'Iveco': ['Daily', 'Eurocargo'],
            'Nissan': ['NV200', 'NV300', 'NV400', 'Primastar'],
            'Opel': ['Combo', 'Vivaro', 'Movano'],
            'Peugeot': ['Partner', 'Expert', 'Boxer', 'Traveller'],
            
            // Truck brands
            'DAF': ['XF', 'XG', 'XG+', 'CF', 'LF'],
            'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
            'Renault Trucks': ['T', 'T High', 'C', 'K', 'D'],
            'Scania': ['R-Series', 'S-Series', 'G-Series', 'P-Series'],
            
            // Trailer brands
            'Böckmann': ['Cargo', 'Horse Trailer', 'Car Trailer'],
            'Brenderup': ['1205S', '2260S', '3251S', '4260S'],
            'Humbaur': ['HT', 'HA', 'HK', 'Startrailer'],
            'Ifor Williams': ['LM', 'GH', 'HB', 'CT'],
            'Saris': ['McAlu', 'Wood', 'Magnum'],
            'Unsinn': ['WEB', 'Mini', 'Profi'],
            
            // Motorcycle brands
            'Ducati': ['Panigale', 'Monster', 'Multistrada', 'Scrambler', 'Diavel'],
            'Harley-Davidson': ['Sportster', 'Softail', 'Touring', 'Street', 'Pan America'],
            'Honda': ['CBR', 'CB', 'CRF', 'Africa Twin', 'Gold Wing'],
            'Kawasaki': ['Ninja', 'Z', 'Versys', 'Vulcan', 'KX'],
            'KTM': ['Duke', 'RC', 'Adventure', 'Enduro', 'Supermoto'],
            'Suzuki': ['GSX-R', 'GSX-S', 'V-Strom', 'Hayabusa', 'SV'],
            'Triumph': ['Street Triple', 'Speed Triple', 'Tiger', 'Bonneville', 'Rocket'],
            'Yamaha': ['YZF-R', 'MT', 'Tracer', 'Ténéré', 'XSR']
        };
        return models[brandName] || ['Model 1', 'Model 2', 'Model 3'];
    };

    const handleBrandClick = (brandName) => {
        setSelectedBrand(brandName);
        setModelSearchTerm('');
    };

    const handleModelSelect = (modelName) => {
        setSelectedItems({ brand: selectedBrand, model: modelName });
        setShowSummary(true);
    };

    const handleBackToBrands = () => {
        setSelectedBrand(null);
        setModelSearchTerm('');
    };

    const handleApplyFilters = () => {
        if (selectedItems.brand && selectedItems.model) {
            const searchedItem = `${selectedItems.brand} ${selectedItems.model}`;
            onChange({ target: { value: searchedItem } });
            
            // Add to last searched (keep only last 3)
            setLastSearched(prev => {
                const updated = [searchedItem, ...prev.filter(item => item !== searchedItem)];
                return updated.slice(0, 3);
            });
        }
        // Close dropdown on apply
        setIsOpen(false);
        setShowSummary(false);
        setSelectedBrand(null);
        setSearchTerm('');
        setModelSearchTerm('');
    };

    const handleAddMore = () => {
        // Go back to brand selection to add more
        setShowSummary(false);
        setSelectedBrand(null);
        setSearchTerm('');
        setModelSearchTerm('');
    };

    const handleResetSelection = () => {
        setSelectedItems({ brand: null, model: null });
        setShowSummary(false);
        setSelectedBrand(null);
    };

    const removeSelectedItem = (type) => {
        if (type === 'brand') {
            setSelectedItems({ brand: null, model: null });
        } else if (type === 'model') {
            setSelectedItems({ ...selectedItems, model: null });
        }
    };

    const getBrandLogo = (brandName) => {
        const logos = {
            'Mercedes-Benz': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="23" fill="none" stroke="#000" strokeWidth="1.5"/>
                    <path d="M25 5 L25 25 L40 40 M25 25 L10 40" stroke="#000" strokeWidth="1.5" fill="none"/>
                </svg>
            ),
            'BMW': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="23" fill="none" stroke="#000" strokeWidth="1.5"/>
                    <path d="M25 2 L25 48 M2 25 L48 25" stroke="#000" strokeWidth="1.5"/>
                    <path d="M25 25 L2 2 L25 2 Z" fill="#0066B1"/>
                    <path d="M25 25 L48 48 L25 48 Z" fill="#0066B1"/>
                </svg>
            ),
            'Audi': (
                <svg viewBox="0 0 80 30" className="w-full h-full">
                    <circle cx="10" cy="15" r="9" fill="none" stroke="#000" strokeWidth="1.5"/>
                    <circle cx="27" cy="15" r="9" fill="none" stroke="#000" strokeWidth="1.5"/>
                    <circle cx="44" cy="15" r="9" fill="none" stroke="#000" strokeWidth="1.5"/>
                    <circle cx="61" cy="15" r="9" fill="none" stroke="#000" strokeWidth="1.5"/>
                </svg>
            ),
            'Volkswagen': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="23" fill="#001E50" stroke="#001E50" strokeWidth="1"/>
                    <text x="25" y="32" fontSize="24" fill="#fff" textAnchor="middle" fontWeight="bold">VW</text>
                </svg>
            ),
            'Porsche': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <rect x="5" y="15" width="40" height="20" fill="#D5A13A" stroke="#000" strokeWidth="1"/>
                    <text x="25" y="30" fontSize="12" fill="#000" textAnchor="middle" fontWeight="bold">PORSCHE</text>
                </svg>
            ),
            'Toyota': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <ellipse cx="25" cy="25" rx="15" ry="10" fill="none" stroke="#000" strokeWidth="2"/>
                    <ellipse cx="25" cy="25" rx="10" ry="15" fill="none" stroke="#000" strokeWidth="2"/>
                </svg>
            ),
            'Ford': (
                <svg viewBox="0 0 60 30" className="w-full h-full">
                    <ellipse cx="30" cy="15" rx="28" ry="13" fill="#003478" stroke="#003478"/>
                    <text x="30" y="20" fontSize="14" fill="#fff" textAnchor="middle" fontWeight="bold" fontStyle="italic">Ford</text>
                </svg>
            ),
            'Skoda': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="23" fill="#4BA82E" stroke="#4BA82E"/>
                    <path d="M15 25 L25 15 L35 25 L25 35 Z" fill="#fff"/>
                </svg>
            ),
            'Volvo': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <circle cx="25" cy="25" r="23" fill="none" stroke="#000" strokeWidth="2"/>
                    <path d="M25 10 L25 40 M10 25 L40 25" stroke="#000" strokeWidth="2"/>
                    <circle cx="25" cy="25" r="3" fill="#000"/>
                </svg>
            ),
            'Renault': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <path d="M25 5 L40 20 L40 30 L25 45 L10 30 L10 20 Z" fill="#FFCC00" stroke="#000" strokeWidth="1"/>
                </svg>
            ),
            'Fiat': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <rect x="5" y="15" width="40" height="20" rx="3" fill="#C8102E" stroke="#C8102E"/>
                    <text x="25" y="30" fontSize="14" fill="#fff" textAnchor="middle" fontWeight="bold">FIAT</text>
                </svg>
            ),
            'Seat': (
                <svg viewBox="0 0 50 50" className="w-full h-full">
                    <rect x="5" y="15" width="40" height="20" rx="2" fill="#E2001A" stroke="#E2001A"/>
                    <text x="25" y="30" fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">SEAT</text>
                </svg>
            )
        };
        return logos[brandName] || (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                <span className="text-2xl font-bold text-gray-400">{brandName.charAt(0)}</span>
            </div>
        );
    };

    const mostWantedBrands = [
        { name: 'Mercedes-Benz', count: 15234 },
        { name: 'BMW', count: 12456 },
        { name: 'Audi', count: 11234 },
        { name: 'Volkswagen', count: 9876 },
        { name: 'Porsche', count: 5432 },
        { name: 'Toyota', count: 4567 },
        { name: 'Ford', count: 3456 },
        { name: 'Skoda', count: 3234 },
        { name: 'Volvo', count: 2987 },
        { name: 'Renault', count: 2765 },
        { name: 'Fiat', count: 2543 },
        { name: 'Seat', count: 2345 }
    ];

    const allBrands = vehicleType === 'motorhome' ? [
        { name: 'ACTION MOBILE', count: 3 },
        { name: 'ADRIA', count: 136 },
        { name: 'ADVENTURER', count: 0 },
        { name: 'AERO ONE', count: 0 },
        { name: 'AERO PLAST', count: 0 },
        { name: 'MAPLE', count: 4 },
        { name: 'AIRSTREAM', count: 1 },
        { name: 'ARCA', count: 12 },
        { name: 'AUTOSTAR', count: 8 },
        { name: 'BENIMAR', count: 45 },
        { name: 'BÜRSTNER', count: 89 },
        { name: 'CARADO', count: 67 },
        { name: 'CARTHAGO', count: 34 },
        { name: 'CHAUSSON', count: 56 },
        { name: 'CI', count: 23 },
        { name: 'CONCORDE', count: 15 },
        { name: 'DETHLEFFS', count: 78 },
        { name: 'ELNAGH', count: 19 },
        { name: 'EURA MOBIL', count: 42 },
        { name: 'FENDT', count: 91 },
        { name: 'FIAT', count: 234 },
        { name: 'FORD', count: 156 },
        { name: 'FRANKIA', count: 28 },
        { name: 'HOBBY', count: 103 },
        { name: 'HYMER', count: 187 },
        { name: 'ITINEO', count: 31 },
        { name: 'KNAUS', count: 145 },
        { name: 'LAIKA', count: 52 },
        { name: 'LMC', count: 38 },
        { name: 'MCLOUIS', count: 44 },
        { name: 'MERCEDES-BENZ', count: 98 },
        { name: 'MOBILVETTA', count: 27 },
        { name: 'NIESMANN+BISCHOFF', count: 16 },
        { name: 'PILOTE', count: 63 },
        { name: 'PÖSSL', count: 71 },
        { name: 'RAPIDO', count: 85 },
        { name: 'RIMOR', count: 22 },
        { name: 'ROLLER TEAM', count: 49 },
        { name: 'SEA', count: 11 },
        { name: 'SUNLIGHT', count: 76 },
        { name: 'TRIGANO', count: 33 },
        { name: 'WEINSBERG', count: 124 },
        { name: 'WESTFALIA', count: 58 }
    ] : vehicleType === 'commercial' ? [
        { name: 'Citroën', count: 234 },
        { name: 'Fiat', count: 456 },
        { name: 'Ford', count: 567 },
        { name: 'Iveco', count: 189 },
        { name: 'Mercedes-Benz', count: 678 },
        { name: 'Nissan', count: 234 },
        { name: 'Opel', count: 345 },
        { name: 'Peugeot', count: 456 },
        { name: 'Renault', count: 389 },
        { name: 'Toyota', count: 234 },
        { name: 'Volkswagen', count: 567 }
    ] : vehicleType === 'truck' ? [
        { name: 'DAF', count: 234 },
        { name: 'Iveco', count: 345 },
        { name: 'MAN', count: 456 },
        { name: 'Mercedes-Benz', count: 567 },
        { name: 'Renault Trucks', count: 234 },
        { name: 'Scania', count: 345 },
        { name: 'Volvo', count: 456 }
    ] : vehicleType === 'trailer' ? [
        { name: 'Böckmann', count: 123 },
        { name: 'Brenderup', count: 89 },
        { name: 'Humbaur', count: 156 },
        { name: 'Ifor Williams', count: 98 },
        { name: 'Saris', count: 134 },
        { name: 'Unsinn', count: 112 },
        { name: 'Westfalia', count: 87 }
    ] : vehicleType === 'motorcycle' ? [
        { name: 'BMW', count: 234 },
        { name: 'Ducati', count: 156 },
        { name: 'Harley-Davidson', count: 345 },
        { name: 'Honda', count: 456 },
        { name: 'Kawasaki', count: 289 },
        { name: 'KTM', count: 234 },
        { name: 'Suzuki', count: 198 },
        { name: 'Triumph', count: 167 },
        { name: 'Yamaha', count: 378 }
    ] : [
        { name: 'AC', count: 19 },
        { name: 'Acura', count: 1 },
        { name: 'Alfa Romeo', count: 456 },
        { name: 'Aston Martin', count: 89 },
        { name: 'Audi', count: 11234 },
        { name: 'Bentley', count: 67 },
        { name: 'BMW', count: 12456 },
        { name: 'Bugatti', count: 12 },
        { name: 'Cadillac', count: 234 },
        { name: 'Chevrolet', count: 567 },
        { name: 'Chrysler', count: 123 },
        { name: 'Citroen', count: 1234 },
        { name: 'Cupra', count: 345 },
        { name: 'Dacia', count: 890 },
        { name: 'Dodge', count: 234 },
        { name: 'Ferrari', count: 156 },
        { name: 'Fiat', count: 2543 },
        { name: 'Ford', count: 3456 },
        { name: 'Honda', count: 1987 },
        { name: 'Hyundai', count: 2345 },
        { name: 'Jaguar', count: 345 },
        { name: 'Jeep', count: 678 },
        { name: 'Kia', count: 1876 },
        { name: 'Lamborghini', count: 514 },
        { name: 'Lancia', count: 176 },
        { name: 'Land Rover', count: 2491 },
        { name: 'Le Zebre', count: 1 },
        { name: 'Lea-Francis', count: 1 },
        { name: 'Leapmotor', count: 108 },
        { name: 'Legends Car', count: 0 },
        { name: 'LEVC', count: 0 },
        { name: 'Lexus', count: 339 },
        { name: 'Lotus', count: 45 },
        { name: 'Maserati', count: 234 },
        { name: 'Mazda', count: 1456 },
        { name: 'McLaren', count: 78 },
        { name: 'Mercedes-Benz', count: 15234 },
        { name: 'Mini', count: 2345 },
        { name: 'Mitsubishi', count: 876 },
        { name: 'Nissan', count: 1987 },
        { name: 'Opel', count: 2876 },
        { name: 'Peugeot', count: 2456 },
        { name: 'Polestar', count: 123 },
        { name: 'Porsche', count: 5432 },
        { name: 'Renault', count: 2765 },
        { name: 'Rolls-Royce', count: 34 },
        { name: 'Seat', count: 2345 },
        { name: 'Skoda', count: 3234 },
        { name: 'Smart', count: 567 },
        { name: 'Subaru', count: 678 },
        { name: 'Suzuki', count: 987 },
        { name: 'Tesla', count: 1234 },
        { name: 'Toyota', count: 4567 },
        { name: 'Volkswagen', count: 9876 },
        { name: 'Volvo', count: 2987 }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const dropdownHeight = 600; // max-height of dropdown
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const spaceAbove = buttonRect.top;

            // If not enough space below but enough space above, open upward
            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                setDropdownPosition('top');
            } else {
                setDropdownPosition('bottom');
            }
        }
    }, [isOpen]);

    const handleSelect = (brandName) => {
        onChange({ target: { value: brandName } });
        setIsOpen(false);
        setSearchTerm('');
    };

    const filteredBrands = allBrands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-1.5 w-full relative" ref={dropdownRef}>
            {label && <label className="text-sm font-bold text-gray-800">{label}</label>}
            <div className="relative group">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full h-11 px-3 bg-[#EEF0F5] border border-gray-300 rounded-lg text-sm md:text-base text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-medium italic transition-all text-gray-700 cursor-pointer shadow-sm hover:border-gray-400"
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
                    <div className={`absolute z-[9999] left-0 ${dropdownPosition === 'top' ? 'bottom-full mb-1' : 'mt-1'} bg-white border border-gray-200 rounded-lg shadow-xl max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent w-[350px]`}>
                        {showSummary ? (
                            <>
                                {/* Summary View */}
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-gray-900">Make & Model</h3>
                                        {(selectedItems.brand || selectedItems.model) && (
                                            <span className="bg-yellow-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                                {selectedItems.model ? '2' : '1'}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-3">
                                    <button
                                        onClick={handleResetSelection}
                                        className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4"
                                    >
                                        Reset
                                    </button>

                                    {/* Excluded Section */}
                                    {excludeMode && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-bold text-gray-900 mb-2">Excluded</h4>
                                        </div>
                                    )}

                                    {/* Selected Brand */}
                                    {selectedItems.brand && (
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between py-2">
                                                <span className="text-sm text-gray-600">Brand</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-900">{selectedItems.brand}</span>
                                                    <button
                                                        onClick={() => removeSelectedItem('brand')}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Selected Model */}
                                    {selectedItems.model && (
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between py-2">
                                                <span className="text-sm text-gray-600">Model</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-900">{selectedItems.model}</span>
                                                    <button
                                                        onClick={() => removeSelectedItem('model')}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Version (placeholder) */}
                                    <div className="mb-3">
                                        <button
                                            className="w-full flex items-center justify-between py-2"
                                        >
                                            <span className="text-sm text-gray-600">Version</span>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <h4 className="text-sm font-bold text-gray-900 mb-3">Additional vehicle</h4>
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            <button 
                                                onClick={handleAddMore}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-primary-600 hover:bg-primary-50 transition-all"
                                            >
                                                + Add
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-primary-600 hover:bg-primary-50 transition-all relative">
                                                - Exclude
                                                <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Apply Filters Button */}
                                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3">
                                    <button
                                        onClick={handleApplyFilters}
                                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all"
                                    >
                                        Apply filters
                                    </button>
                                </div>
                            </>
                        ) : !selectedBrand ? (
                            <>
                                {/* Header with Exclude Toggle */}
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex items-center justify-between">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-primary-600 hover:text-primary-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className="text-base font-bold text-gray-900">Brand</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs text-gray-600">Exclude</span>
                                        <button
                                            onClick={() => setExcludeMode(!excludeMode)}
                                            className={`relative w-10 h-5 rounded-full transition-colors ${excludeMode ? 'bg-primary-600' : 'bg-gray-300'}`}
                                        >
                                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${excludeMode ? 'translate-x-5' : ''}`}></span>
                                        </button>
                                        <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                                    </div>
                                </div>

                                {/* Search Box */}
                                <div className="p-3">
                                    <div className="relative">
                                        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search Brand"
                                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                {/* Most Wanted Brands */}
                                {!searchTerm && vehicleType === 'car' && (
                                    <>
                                        <div className="px-3 pb-3">
                                            <h4 className="text-sm font-bold text-gray-900 mb-2">Most Wanted Brands</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                {mostWantedBrands.map((brand, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleBrandClick(brand.name)}
                                                        className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
                                                    >
                                                        <div className="w-6 h-6 flex items-center justify-center mb-1">
                                                            {getBrandLogo(brand.name)}
                                                        </div>
                                                        <span className="text-[9px] text-gray-600 text-center line-clamp-1">{brand.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Last Searched */}
                                        {lastSearched.length > 0 && (
                                            <div className="px-3 pb-3">
                                                <h4 className="text-sm font-bold text-gray-900 mb-2">Last searched by you</h4>
                                                <div className="space-y-1">
                                                    {lastSearched.map((item, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => {
                                                                onChange({ target: { value: item } });
                                                                setIsOpen(false);
                                                            }}
                                                            className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-colors text-center"
                                                        >
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* All Brands List */}
                                <div className="px-3 pb-3">
                                    <h4 className="text-sm font-bold text-gray-900 mb-2">All brands</h4>
                                    <div className="space-y-0.5">
                                        {filteredBrands.map((brand, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleBrandClick(brand.name)}
                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                                            >
                                                <span className="text-sm text-gray-700 font-medium">{brand.name}</span>
                                                <div className="flex items-center gap-2">
                                                    {!excludeMode && <span className="text-xs text-gray-400">{brand.count}</span>}
                                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Models View */}
                                <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex items-center gap-2">
                                    <button
                                        onClick={handleBackToBrands}
                                        className="text-primary-600 hover:text-primary-700"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className="text-base font-bold text-gray-900">{selectedBrand} Models</h3>
                                </div>

                                {/* Model Search Box */}
                                <div className="p-3">
                                    <div className="relative">
                                        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            value={modelSearchTerm}
                                            onChange={(e) => setModelSearchTerm(e.target.value)}
                                            placeholder="Find a model"
                                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                {/* Last Searched */}
                                {lastSearched.length > 0 && (
                                    <div className="px-3 pb-3">
                                        <h4 className="text-sm font-bold text-gray-900 mb-2">Last searched by you</h4>
                                        <div className="space-y-1">
                                            {lastSearched.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        onChange({ target: { value: item } });
                                                        setIsOpen(false);
                                                    }}
                                                    className="w-full px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-colors text-center"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Select All Models */}
                                <div className="px-3 pb-2">
                                    <button
                                        onClick={() => handleModelSelect('All Models')}
                                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <span className="text-sm text-gray-700 font-medium">Select all models</span>
                                        <span className="text-xs text-gray-400">{getBrandModels(selectedBrand).length}</span>
                                    </button>
                                </div>

                                {/* Models List */}
                                <div className="px-3 pb-3">
                                    <div className="space-y-0.5">
                                        {getBrandModels(selectedBrand)
                                            .filter(model => model.toLowerCase().includes(modelSearchTerm.toLowerCase()))
                                            .map((model, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleModelSelect(model)}
                                                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                                                >
                                                    <span className="text-sm text-gray-700">{model}</span>
                                                    <span className="text-xs text-gray-400">{Math.floor(Math.random() * 100) + 1}</span>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandSelector;
