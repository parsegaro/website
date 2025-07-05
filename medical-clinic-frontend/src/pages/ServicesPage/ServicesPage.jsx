import React, { useEffect } from 'react';
import styles from './ServicesPage.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Placeholder data for services - this can be expanded or fetched from an API
// Using the same icons as in ServicesSection for now
const EndoscopyIcon = () => (
  <svg className={styles.serviceSvgIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/>
    <path d="M10 10h4v4h-4z" opacity="0.6"/>
  </svg>
);

const HeartEchoIcon = () => (
  <svg className={styles.serviceSvgIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
    <path d="M7.93 7.5L10 5.43l2.07 2.07c.28.28.28.72 0 1L10 10.57l-2.07-2.07c-.28-.28-.28-.72 0-1zm8.64 0L18.64 6c.28-.28.28-.72 0-1L16.57 2.93c-.28-.28-.72-.28-1 0L13.5 5l2.07 2.07c.28.28.72.28 1 0zM6.5 13.5l2.07 2.07c.28.28.28.72 0 1L6.5 18.64c-.28.28-.72.28-1 0L3.43 16.57c-.28-.28-.28-.72 0-1L5.5 13.5c.28-.28.72-.28 1 0z"/>
    <circle cx="12" cy="12" r="3" opacity="0.5"/>
    <path d="M14 19h-4v-2h4v2zm2-14h-8v2h8V5z" />
  </svg>
);

const servicesPageData = [
  {
    id: 1,
    icon: <EndoscopyIcon />,
    title: "آندوسکوپی و کولونوسکوپی تشخیصی و درمانی",
    description: "کلینیک ما مجهز به جدیدترین دستگاه‌های آندوسکوپی و کولونوسکوپی برای بررسی دقیق مری، معده، اثنی‌عشر و روده بزرگ است. این روش‌ها به تشخیص بیماری‌هایی مانند زخم‌ها، التهابات، پولیپ‌ها و سرطان‌های دستگاه گوارش کمک می‌کنند. همچنین امکان انجام اقدامات درمانی مانند پولیپکتومی (برداشتن پولیپ)، بندینگ واریس مری، و کنترل خونریزی‌های گوارشی نیز فراهم است."
  },
  {
    id: 2,
    icon: <HeartEchoIcon />,
    title: "اکوکاردیوگرافی پیشرفته قلب و عروق",
    description: "اکوکاردیوگرافی یک روش تصویربرداری غیرتهاجمی است که با استفاده از امواج صوتی، تصاویر دقیقی از ساختار قلب، عملکرد دریچه‌ها و حرکت دیواره‌های قلبی ارائه می‌دهد. این تست برای تشخیص بیماری‌های مادرزادی قلب، مشکلات دریچه‌ای، بیماری‌های عضله قلب و بررسی تاثیر فشار خون بالا بر قلب کاربرد دارد."
  },
  {
    id: 3,
    icon: <EcgIcon />,
    title: "نوار قلب (ECG) و تست ورزش",
    description: "نوار قلب یا الکتروکاردیوگرام، فعالیت الکتریکی قلب را ثبت کرده و به تشخیص آریتمی‌ها (نامنظمی‌های ضربان قلب)، ایسکمی قلبی (کاهش خون‌رسانی به عضله قلب) و سایر مشکلات قلبی کمک می‌کند. تست ورزش نیز با بررسی عملکرد قلب حین فعالیت بدنی، اطلاعات مهمی در مورد بیماری‌های عروق کرونر ارائه می‌دهد."
  },
  {
    id: 4,
    icon: <PolypectomyIcon />,
    title: "پولیپکتومی و پیشگیری از سرطان",
    description: "پولیپ‌ها توده‌های کوچکی هستند که در دیواره دستگاه گوارش رشد می‌کنند و برخی از آن‌ها پتانسیل سرطانی شدن دارند. پولیپکتومی، عمل برداشتن این پولیپ‌ها حین آندوسکوپی یا کولونوسکوپی است که نقش بسیار مهمی در پیشگیری از سرطان‌های دستگاه گوارش، به ویژه سرطان روده بزرگ، ایفا می‌کند."
  },
  // Add more services as needed
  // {
  //   id: 5,
  //   icon: <SomeOtherIcon />,
  //   title: "مشاوره تغذیه و رژیم درمانی",
  //   description: "ارائه مشاوره‌های تخصصی تغذیه برای بیماری‌های گوارشی، قلبی، دیابت و کنترل وزن، همراه با تنظیم رژیم‌های غذایی مناسب برای هر فرد."
  // },
];


const ServicesPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Animate slightly earlier
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [controls, inView]);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={styles.servicesPage}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <div className={styles.pageHeader}>
        <motion.h1 variants={itemVariants}>خدمات تخصصی ما</motion.h1>
        <motion.p variants={itemVariants} className={styles.pageSubtitle}>
          در کلینیک ما، ما به ارائه طیف گسترده‌ای از خدمات تشخیصی و درمانی با بالاترین کیفیت متعهد هستیم.
        </motion.p>
      </div>

      <div className={styles.servicesListContainer}>
        {servicesPageData.map(service => (
          <motion.div key={service.id} className={styles.serviceItem} variants={itemVariants}>
            <div className={styles.serviceItemIcon}>{service.icon}</div>
            <div className={styles.serviceItemContent}>
              <h2 className={styles.serviceItemTitle}>{service.title}</h2>
              <p className={styles.serviceItemDescription}>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesPage;
