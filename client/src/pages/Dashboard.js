/**
 * Dashboard Page Component
 * Contact management interface
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ContactTable from '../components/ContactTable';
import ContactForm from '../components/ContactForm';
import LanguageSwitcher from '../components/LanguageSwitcher';
import '../styles/pages.css';

function Dashboard({ onLogout }) {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactCount, setContactCount] = useState(0);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('rbk_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(t('common.fetch_failed'));
      }

      const data = await response.json();
      setContacts(data.contacts);
      setContactCount(data.count);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const token = localStorage.getItem('rbk_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || t('dashboard.add_failed'));
      }

      setShowForm(false);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateContact = async (contactId, contactData) => {
    try {
      const token = localStorage.getItem('rbk_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error(t('dashboard.update_failed'));
      }

      setShowForm(false);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm(t('dashboard.confirm_delete'))) return;

    try {
      const token = localStorage.getItem('rbk_token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(t('dashboard.delete_failed'));
      }

      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingContact(null);
    setError('');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Rebook</h1>
            <p className="header-subtitle">{t('dashboard.welcome')}</p>
          </div>
          <div className="header-right">
            <LanguageSwitcher />
            <button className="btn btn-logout" onClick={onLogout}>
              {t('common.logout')}
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="content-wrapper">
          <div className="section-header">
            <div>
              <h2>{t('dashboard.my_contacts')}</h2>
              <p className="contact-count">
                {t('dashboard.contact_count')}: {contactCount}/5
              </p>
            </div>
            {contactCount < 5 && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                + {t('dashboard.add_contact')}
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <ContactForm
              contact={editingContact}
              onSubmit={editingContact 
                ? (data) => handleUpdateContact(editingContact._id, data)
                : handleAddContact
              }
              onClose={handleCloseForm}
            />
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>{t('common.loading')}</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="empty-state">
              <p>{t('dashboard.no_contacts')}</p>
              {contactCount === 0 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  {t('dashboard.add_first_contact')}
                </button>
              )}
            </div>
          ) : (
            <ContactTable
              contacts={contacts}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
