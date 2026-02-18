/**
 * Login Page Component
 * User authentication with phone number and 6-digit passcode
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/pages.css';

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

function Login({ onLoginSuccess }) {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 15);
    setPhoneNumber(value);
  };

  const handlePasscodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPasscode(value);
  };

  const validateInputs = () => {
    if (!phoneNumber || !passcode) {
      setError(t('common.required_fields'));
      return false;
    }
    if (!/^\d{10,15}$/.test(phoneNumber)) {
      setError(t('login.invalid_phone'));
      return false;
    }
    if (passcode.length !== 6) {
      setError(t('login.invalid_passcode'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: `${countryCode}${phoneNumber}`,
          passcode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t('login.auth_failed'));
        return;
      }

      if (isRegister) {
        setError('');
        setIsRegister(false);
        setPhoneNumber('');
        setPasscode('');
        alert(t('login.register_success'));
      } else {
        if (data.token) {
          onLoginSuccess(data.token);
        }
      }
    } catch (err) {
      setError(t('common.error') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Rebook</h1>
          <p>{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="country">{t('login.country_code')}</label>
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
            <label htmlFor="phone">{t('login.phone_number')}</label>
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
          </div>

          <div className="form-group">
            <label htmlFor="passcode">{t('login.passcode')}</label>
            <input
              id="passcode"
              type="password"
              inputMode="numeric"
              placeholder="000000"
              value={passcode}
              onChange={handlePasscodeChange}
              disabled={loading}
              maxLength="6"
              required
            />
            <small>{t('login.passcode_hint')}</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? t('common.loading') : isRegister ? t('login.register_btn') : t('login.login_btn')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isRegister ? t('login.have_account') : t('login.no_account')}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="toggle-link"
              disabled={loading}
            >
              {isRegister ? t('login.login') : t('login.register')}
            </button>
          </p>
        </div>

        <div className="security-note">
          <p>🔒 {t('login.security_note')}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
