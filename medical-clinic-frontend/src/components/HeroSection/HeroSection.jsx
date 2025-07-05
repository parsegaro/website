import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            مراقبت‌های تخصصی گوارش و قلب، در دسترس شما
          </h1>
          <p className={styles.heroSubtitle}>
            کلینیک ما با بهره‌گیری از جدیدترین تجهیزات و کادر مجرب، بهترین خدمات تشخیصی و درمانی را در زمینه بیماری‌های گوارشی و قلبی ارائه می‌دهد.
          </p>
          <a href="#services" className={styles.ctaButton}>
            مشاهده خدمات ما
          </a>
        </div>
        {/* Optional: Placeholder for an image or illustration */}
        {/* <div className={styles.heroImage}>
          <img src="/path-to-your-hero-image.jpg" alt="کلینیک پزشکی" />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
