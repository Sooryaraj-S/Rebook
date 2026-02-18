/**
 * Footer Component
 */

import React from 'react';
import '../styles/components.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Rebook. All Rights Reserved.</p>
      <p>Developed by Sooryaraj</p>
    </footer>
  );
}

export default Footer;
