/**
 * Contact Table Component
 * Displays contacts with call, message, edit, and delete actions
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/components.css';

function ContactTable({ contacts, onEdit, onDelete }) {
  const { t } = useTranslation();

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleMessage = (phoneNumber) => {
    window.location.href = `sms:${phoneNumber}`;
  };

  return (
    <div className="table-container">
      <table className="contacts-table">
        <thead>
          <tr>
            <th>{t('table.sno')}</th>
            <th>{t('table.name')}</th>
            <th>{t('table.phone')}</th>
            <th>{t('table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact._id} className="contact-row">
              <td className="cell-sno">{index + 1}</td>
              <td className="cell-name">{contact.name}</td>
              <td className="cell-phone">{contact.phoneNumber}</td>
              <td className="cell-actions">
                <button
                  className="btn-action btn-call"
                  onClick={() => handleCall(contact.phoneNumber)}
                  title={t('table.call')}
                >
                  📞 {t('table.call')}
                </button>
                <button
                  className="btn-action btn-message"
                  onClick={() => handleMessage(contact.phoneNumber)}
                  title={t('table.message')}
                >
                  💬 {t('table.message')}
                </button>
                <button
                  className="btn-action btn-edit"
                  onClick={() => onEdit(contact)}
                  title={t('table.edit')}
                >
                  ✏️ {t('table.edit')}
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => onDelete(contact._id)}
                  title={t('table.delete')}
                >
                  🗑️ {t('table.delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
