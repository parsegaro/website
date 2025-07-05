import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './HeroSection.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={styles.hero}
    >
      <div className={`${styles.container} ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.heroTitle}
            variants={variants} // Can use the same variants or define specific ones
          >
            مراقبت‌های تخصصی گوارش و قلب، در دسترس شما
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            variants={{ // Slightly delayed subtitle
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
            }}
          >
            کلینیک ما با بهره‌گیری از جدیدترین تجهیزات و کادر مجرب، بهترین خدمات تشخیصی و درمانی را در زمینه بیماری‌های گوارشی و قلبی ارائه می‌دهد.
          </motion.p>
          <motion.div
            variants={{ // Delayed button
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } }
            }}
          >
            <Link to="/appointment" className={styles.ctaButton}>
              رزرو نوبت آنلاین
            </Link>
          </motion.div>
        </div>
        {/* Optional: Placeholder for an image or illustration */}
        {/* <div className={styles.heroImage}>
          <img src="/path-to-your-hero-image.jpg" alt="کلینیک پزشکی" />
        </div> */}
      </div>
    </motion.section>
  );
};

export default HeroSection;
