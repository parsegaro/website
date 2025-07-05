import React, { useEffect } from 'react';
import styles from './ServicesSection.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- SVG Icon Components ---
// These are very basic SVGs for demonstration.
// Replace with more professional/appropriate icons.

const EndoscopyIcon = () => (
  <svg className={styles.serviceSvgIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/>
    {/* Simplified representation of a scope or internal organ section */}
    <path d="M10 10h4v4h-4z" opacity="0.6"/>
  </svg>
);

const HeartEchoIcon = () => (
  <svg className={styles.serviceSvgIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    {/* Adding symbolic sound waves */}
    <path d="M18 9h-2V7h2v2zm-2 4h2v-2h-2v2zm2 2h-2v2h2v-2zM8 9H6V7h2v2zm-2 4h2v-2H6v2zm2 2H6v2h2v-2z" opacity="0.7"/>
  </svg>
);

const EcgIcon = () => (
  <svg className={styles.serviceSvgIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13h2l2-6 2 10 3-14 3 14 2-10 2 6h2"/>
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke="currentColor" fill="none" strokeWidth="1"/>
  </svg>
);

const PolypectomyIcon = () => (
  <svg className={styles.serviceSvgIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Scissors or a cutting tool representation */}
    <path d="M7.93 7.5L10 5.43l2.07 2.07c.28.28.28.72 0 1L10 10.57l-2.07-2.07c-.28-.28-.28-.72 0-1zm8.64 0L18.64 6c.28-.28.28-.72 0-1L16.57 2.93c-.28-.28-.72-.28-1 0L13.5 5l2.07 2.07c.28.28.72.28 1 0zM6.5 13.5l2.07 2.07c.28.28.28.72 0 1L6.5 18.64c-.28.28-.72.28-1 0L3.43 16.57c-.28-.28-.28-.72 0-1L5.5 13.5c.28-.28.72-.28 1 0z"/>
    <circle cx="12" cy="12" r="3" opacity="0.5"/>
    <path d="M14 19h-4v-2h4v2zm2-14h-8v2h8V5z" />
  </svg>
);
// --- End SVG Icon Components ---

const servicesData = [
  {
    id: 1,
    icon: <EndoscopyIcon />,
    title: "آندوسکوپی و کولونوسکوپی",
    description: "تشخیص و درمان بیماری‌های مری، معده، اثنی‌عشر و روده بزرگ با استفاده از پیشرفته‌ترین دستگاه‌ها."
  },
  {
    id: 2,
    icon: <HeartEchoIcon />,
    title: "اکوکاردیوگرافی قلب",
    description: "تصویربرداری دقیق از ساختار و عملکرد قلب برای تشخیص بیماری‌های قلبی و عروقی."
  },
  {
    id: 3,
    icon: <EcgIcon />,
    title: "نوار قلب (ECG)",
    description: "ثبت فعالیت الکتریکی قلب برای بررسی ریتم و تشخیص مشکلات قلبی."
  },
  {
    id: 4,
    icon: <PolypectomyIcon />,
    title: "پولیپکتومی",
    description: "برداشتن پولیپ‌های دستگاه گوارش حین آندوسکوپی یا کولونوسکوپی جهت پیشگیری و درمان."
  }
];

const ServicesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // Lower threshold for sections further down
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
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 } // Stagger children animation
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="services"
      className={styles.servicesSection}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        {/* Title and subtitle can also be animated if desired */}
        <h2 className={styles.sectionTitle}>خدمات ما</h2>
        <p className={styles.sectionSubtitle}>
          ارائه طیف وسیعی از خدمات تخصصی گوارش و قلب با بالاترین استانداردها.
        </p>
        <motion.div
          className={styles.servicesGrid}
          // variants={sectionVariants} // Grid itself can use section variants if not staggering children directly
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.serviceCard}
              variants={cardVariants}
              // Custom delay for each card can be done here if not using staggerChildren
              // initial="hidden" // if not inheriting from parent
              // animate="visible" // if not inheriting from parent
            >
              <div className={styles.serviceIcon}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <a href="#" className={styles.serviceLink}>اطلاعات بیشتر</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
