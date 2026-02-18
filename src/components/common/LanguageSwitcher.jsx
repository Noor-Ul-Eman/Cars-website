import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-1 text-gray-600 hover:text-orange-600 font-medium transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="uppercase">{i18n.language.split('-')[0]}</span>
            </button>

            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 border border-gray-100 hidden group-hover:block z-50">
                <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 ${i18n.language === 'en' ? 'text-orange-600 font-medium' : 'text-gray-700'}`}
                >
                    English (EN)
                </button>
                <button
                    onClick={() => changeLanguage('de-CH')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 ${i18n.language === 'de-CH' ? 'text-orange-600 font-medium' : 'text-gray-700'}`}
                >
                    Deutsch (CH)
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
