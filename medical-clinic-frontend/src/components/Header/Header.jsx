import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref for the nav element
  const menuToggleRef = useRef(null); // Ref for the menu toggle button

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) &&
          menuToggleRef.current && !menuToggleRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Helper for NavLink active class
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMobileMenu}>کلینیک پزشکی شما</Link>
        </div>
        <nav ref={navRef} className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul>
            <li><NavLink to="/" className={getNavLinkClass} onClick={closeMobileMenu} end>صفحه اصلی</NavLink></li>
            <li><NavLink to="/services" className={getNavLinkClass} onClick={closeMobileMenu}>خدمات</NavLink></li>
            {/* Placeholder links for now, will be updated when pages are created */}
            <li><NavLink to="/doctors" className={getNavLinkClass} onClick={closeMobileMenu}>پزشکان</NavLink></li>
            <li><NavLink to="/blog" className={getNavLinkClass} onClick={closeMobileMenu}>وبلاگ</NavLink></li>
            <li><NavLink to="/contact" className={getNavLinkClass} onClick={closeMobileMenu}>تماس با ما</NavLink></li>
          </ul>
        </nav>
        <button
          ref={menuToggleRef}
          className={styles.menuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            // Simple X icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
