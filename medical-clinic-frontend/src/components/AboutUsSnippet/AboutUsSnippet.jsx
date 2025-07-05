import React, { useEffect } from 'react';
import styles from './AboutUsSnippet.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Placeholder image URL - replace with an actual image later
const placeholderImageUrl = 'https://via.placeholder.com/500x350/40E0D0/FFFFFF?text=کلینیک+ما';
// Using primary color for placeholder background

const AboutUsSnippet = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  // Variants for children if needed, for example, animating image and text separately
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Slide from left for LTR, adjust for RTL if needed
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 }, // Slide from right for LTR
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }
  };


  return (
    <motion.section
      id="about-us-snippet"
      className={styles.aboutUsSnippet}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants} // Apply to the whole section first
    >
      <div className={`${styles.container} ${styles.aboutUsContainer}`}>
        <motion.div
          className={styles.aboutUsImage}
          // Optionally animate image and content separately:
          // initial="hidden" animate={controls} variants={imageVariants}
        >
          <img src={placeholderImageUrl} alt="درباره کلینیک ما" />
        </motion.div>
        <motion.div
          className={styles.aboutUsContent}
          // initial="hidden" animate={controls} variants={contentVariants}
        >
          <h2 className={styles.sectionTitle}>درباره کلینیک ما</h2>
          <p className={styles.aboutText}>
            کلینیک پزشکی ما با هدف ارائه خدمات درمانی با کیفیت و به‌روز در محیطی آرام و حرفه‌ای تاسیس گردیده است. ما به سلامت شما اهمیت می‌دهیم و با بهره‌گیری از دانش پزشکان متخصص و تکنولوژی‌های نوین، همواره در تلاشیم تا بهترین تجربه درمانی را برای شما فراهم آوریم.
            اعتماد شما، بزرگترین سرمایه ماست.
          </p>
          <p className={styles.aboutText}>
            در کلینیک ما، خدمات متنوعی در زمینه گوارش و قلب ارائه می‌شود. ما متعهد به ارائه مراقبت‌های شخصی‌سازی شده برای هر بیمار هستیم.
          </p>
          {/* Optional: Add a button to link to a full "About Us" page later */}
          {/* <a href="/about" className={styles.learnMoreButton}>بیشتر بدانید</a> */}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUsSnippet;
