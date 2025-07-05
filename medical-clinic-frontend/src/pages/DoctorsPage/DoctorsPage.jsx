import React, { useEffect } from 'react';
import styles from './DoctorsPage.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Placeholder image URLs - replace with actual images
const placeholderDoctorImageUrl1 = 'https://via.placeholder.com/300x300/40E0D0/FFFFFF?text=دکتر+احمدی';
const placeholderDoctorImageUrl2 = 'https://via.placeholder.com/300x300/48D1CC/FFFFFF?text=دکتر+رضایی';
const placeholderDoctorImageUrl3 = 'https://via.placeholder.com/300x300/00CED1/FFFFFF?text=دکتر+محمدی';
const placeholderDoctorImageUrl4 = 'https://via.placeholder.com/300x300/20B2AA/FFFFFF?text=دکتر+کریمی';


const doctorsFullData = [
  {
    id: 1,
    name: "دکتر مریم احمدی",
    specialty: "متخصص گوارش و کبد",
    imageUrl: placeholderDoctorImageUrl1,
    education: "بورد تخصصی از دانشگاه علوم پزشکی تهران",
    experience: "بیش از ۱۰ سال سابقه در تشخیص و درمان بیماری‌های گوارشی، انجام موفق بیش از ۵۰۰۰ آندوسکوپی و کولونوسکوپی.",
    interests: ["بیماری‌های التهابی روده (IBD)", "کبد چرب", "هپاتیت‌های ویروسی"]
  },
  {
    id: 2,
    name: "دکتر علی رضایی",
    specialty: "متخصص قلب و عروق",
    imageUrl: placeholderDoctorImageUrl2,
    education: "فلوشیپ اکوکاردیوگرافی از مرکز قلب تهران",
    experience: "عضو انجمن قلب ایران، متخصص در انجام اکوکاردیوگرافی داپلر رنگی، تست ورزش و هولتر مانیتورینگ.",
    interests: ["بیماری‌های عروق کرونر", "نارسایی قلبی", "فشار خون بالا"]
  },
  {
    id: 3,
    name: "دکتر سارا محمدی",
    specialty: "فوق تخصص گوارش اطفال",
    imageUrl: placeholderDoctorImageUrl3,
    education: "استادیار دانشگاه علوم پزشکی شهید بهشتی",
    experience: "سابقه درخشان در درمان بیماری‌های گوارشی کودکان از جمله ریفلاکس، آلرژی‌های غذایی و بیماری سلیاک.",
    interests: ["بیماری سلیاک در کودکان", "رشد و تغذیه کودکان", "آندوسکوپی اطفال"]
  },
  {
    id: 4,
    name: "دکتر بهنام کریمی",
    specialty: "متخصص داخلی، گوارش",
    imageUrl: placeholderDoctorImageUrl4,
    education: "دانشگاه علوم پزشکی اصفهان",
    experience: "پزشک متخصص با تمرکز بر بیماری‌های معده و روده، و همچنین غربالگری سرطان‌های دستگاه گوارش.",
    interests: ["سندرم روده تحریک‌پذیر (IBS)", "بیماری‌های مری", "غربالگری سرطان"]
  }
  // Add more doctors as needed
];

const DoctorsPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    window.scrollTo(0, 0);
  }, [controls, inView]);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
  };

  const itemVariants = { // For individual doctor cards
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={styles.doctorsPage}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <div className={styles.pageHeader}>
        <motion.h1 variants={itemVariants}>تیم پزشکان ما</motion.h1>
        <motion.p variants={itemVariants} className={styles.pageSubtitle}>
          با متخصصین مجرب و دلسوز ما که به سلامت شما متعهد هستند، آشنا شوید.
        </motion.p>
      </div>

      <div className={styles.doctorsGridContainer}>
        {doctorsFullData.map(doctor => (
          <motion.div key={doctor.id} className={styles.doctorCard} variants={itemVariants}>
            <div className={styles.doctorCardImageContainer}>
              <img src={doctor.imageUrl} alt={doctor.name} className={styles.doctorCardImage} loading="lazy" />
            </div>
            <div className={styles.doctorCardContent}>
              <h2 className={styles.doctorName}>{doctor.name}</h2>
              <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
              <div className={styles.doctorDetails}>
                <p><strong>تحصیلات:</strong> {doctor.education}</p>
                <p><strong>تجربه:</strong> {doctor.experience}</p>
                {doctor.interests && doctor.interests.length > 0 && (
                  <p><strong>زمینه‌های مورد علاقه:</strong> {doctor.interests.join('، ')}</p>
                )}
              </div>
              {/* <a href={`/doctors/${doctor.id}/profile`} className={styles.profileLink}>مشاهده پروفایل کامل</a> */}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DoctorsPage;
