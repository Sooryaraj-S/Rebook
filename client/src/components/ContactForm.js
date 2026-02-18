/**
 * Contact Form Component
 * Add or edit contact modal
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/components.css';

const COUNTRIES = [
  { code: '+1', name: 'USA' },
  { code: '+44', name: 'UK' },
  { code: '+91', name: 'India' },
  { code: '+86', name: 'China' },
  { code: '+81', name: 'Japan' },
  { code: '+33', name: 'France' },
  { code: '+49', name: 'Germany' },
  { code: '+39', name: 'Italy' },
  { code: '+34', name: 'Spain' },
  { code: '+31', name: 'Netherlands' },
];

function ContactForm({ contact, onSubmit, onClose }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      // Parse country code from phone number
      const phone = contact.phoneNumber;
      const countryMatch = COUNTRIES.find(c => phone.startsWith(c.code));
      if (countryMatch) {
        setCountryCode(countryMatch.code);
        setPhoneNumber(phone.replace(countryMatch.code, ''));
      } else {
        setPhoneNumber(phone.replace(/^\+/, ''));
      }
    }
  }, [contact]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 15);
    setPhoneNumber(value);
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError(t('form.name_required'));
      return false;
    }
    if (!phoneNumber || !/^\d{10,15}$/.test(phoneNumber)) {
      setError(t('form.phone_required'));
      return false;
    }
    if (name.length > 50) {
      setError(t('form.name_too_long'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit({
        name: name.trim(),
        phoneNumber: `${countryCode}${phoneNumber}`
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{contact ? t('form.edit_contact') : t('form.add_contact')}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">{t('form.name')} *</label>
            <input
              id="name"
              type="text"
              placeholder={t('form.name_placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength="50"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">{t('login.country_code')} *</label>
            <select
              id="country"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              disabled={loading}
              className="country-select"
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t('form.phone')} *</label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="1234567890"
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={loading}
              required
            />
            <small>{t('form.phone_hint')}</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? t('common.loading') : contact ? t('form.update') : t('form.add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
