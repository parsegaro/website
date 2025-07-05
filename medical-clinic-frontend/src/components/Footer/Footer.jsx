import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerContainer}`}>
        <div className={styles.copyright}>
          <p>&copy; {currentYear} کلینیک پزشکی شما. تمامی حقوق محفوظ است.</p>
        </div>
        <div className={styles.links}>
          {/* Optional: Add some links here later, e.g., Privacy Policy, Terms of Service */}
          {/* <a href="/privacy-policy">حریم خصوصی</a>
          <a href="/terms-of-service">شرایط استفاده</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
