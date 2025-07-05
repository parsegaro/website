import React from 'react';
import styles from './ServicesSection.module.css';

// Placeholder data for services - this would ideally come from a CMS or API later
const servicesData = [
  {
    id: 1,
    icon: " endoscopyIcon", // Placeholder - we'll need actual icons or images
    title: "آندوسکوپی و کولونوسکوپی",
    description: "تشخیص و درمان بیماری‌های مری، معده، اثنی‌عشر و روده بزرگ با استفاده از پیشرفته‌ترین دستگاه‌ها."
  },
  {
    id: 2,
    icon: "heartEchoIcon", // Placeholder
    title: "اکوکاردیوگرافی قلب",
    description: "تصویربرداری دقیق از ساختار و عملکرد قلب برای تشخیص بیماری‌های قلبی و عروقی."
  },
  {
    id: 3,
    icon: "ecgIcon", // Placeholder
    title: "نوار قلب (ECG)",
    description: "ثبت فعالیت الکتریکی قلب برای بررسی ریتم و تشخیص مشکلات قلبی."
  },
  {
    id: 4,
    icon: "polypectomyIcon", // Placeholder
    title: "پولیپکتومی",
    description: "برداشتن پولیپ‌های دستگاه گوارش حین آندوسکوپی یا کولونوسکوپی جهت پیشگیری و درمان."
  }
];

// A simple placeholder for an icon. In a real app, you'd use SVGs, an icon library, or images.
const PlaceholderIcon = ({ name }) => (
  <div className={styles.serviceIconPlaceholder}>
    {/* You can use a generic SVG or even text initials for placeholder */}
    {name ? name.substring(0, 1).toUpperCase() : 'S'}
  </div>
);


const ServicesSection = () => {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>خدمات ما</h2>
        <p className={styles.sectionSubtitle}>
          ارائه طیف وسیعی از خدمات تخصصی گوارش و قلب با بالاترین استانداردها.
        </p>
        <div className={styles.servicesGrid}>
          {servicesData.map(service => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                {/* Replace PlaceholderIcon with actual icons/images later */}
                <PlaceholderIcon name={service.icon} />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <a href="#" className={styles.serviceLink}>اطلاعات بیشتر</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
