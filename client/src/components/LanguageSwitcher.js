/**
 * Language Switcher Component
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/components.css';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'te', name: 'తెలుగు' }
  ];

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="language-select"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
