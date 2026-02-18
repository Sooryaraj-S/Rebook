/**
 * i18n Configuration
 * Multilingual support: English, Tamil, Hindi, Malayalam, Telugu
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import taTranslations from './locales/ta.json';
import hiTranslations from './locales/hi.json';
import mlTranslations from './locales/ml.json';
import teTranslations from './locales/te.json';

const resources = {
  en: { translation: enTranslations },
  ta: { translation: taTranslations },
  hi: { translation: hiTranslations },
  ml: { translation: mlTranslations },
  te: { translation: teTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('rebook-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('rebook-language', lng);
});

export default i18n;
