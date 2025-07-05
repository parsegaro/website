import React, { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref for the nav element
  const menuToggleRef = useRef(null); // Ref for the menu toggle button

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) &&
          menuToggleRef.current && !menuToggleRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
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

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <a href="/">کلینیک پزشکی شما</a>
        </div>
        <nav ref={navRef} className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul>
            <li><a href="/" onClick={() => setIsMobileMenuOpen(false)}>صفحه اصلی</a></li>
            <li><a href="#services" onClick={() => setIsMobileMenuOpen(false)}>خدمات</a></li>
            <li><a href="#doctors" onClick={() => setIsMobileMenuOpen(false)}>پزشکان</a></li>
            <li><a href="#blog" onClick={() => setIsMobileMenuOpen(false)}>وبلاگ</a></li>
            <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>تماس با ما</a></li>
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
