import React, { useEffect } from 'react';
import styles from './DoctorsSnippet.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Placeholder image URL for doctors - replace with actual images later
const placeholderDoctorImageUrl1 = 'https://via.placeholder.com/300x300/40E0D0/FFFFFF?text=دکتر+احمدی';
const placeholderDoctorImageUrl2 = 'https://via.placeholder.com/300x300/48D1CC/FFFFFF?text=دکتر+رضایی';
const placeholderDoctorImageUrl3 = 'https://via.placeholder.com/300x300/00CED1/FFFFFF?text=دکتر+محمدی';


const doctorsData = [
  {
    id: 1,
    name: "دکتر مریم احمدی",
    specialty: "متخصص گوارش و کبد",
    imageUrl: placeholderDoctorImageUrl1,
    bioSnippet: "دارای بورد تخصصی از دانشگاه علوم پزشکی تهران با ۱۰ سال سابقه درخشان."
  },
  {
    id: 2,
    name: "دکتر علی رضایی",
    specialty: "متخصص قلب و عروق",
    imageUrl: placeholderDoctorImageUrl2,
    bioSnippet: "فلوشیپ اکوکاردیوگرافی از مرکز قلب تهران، عضو انجمن قلب ایران."
  },
  {
    id: 3,
    name: "دکتر سارا محمدی",
    specialty: "فوق تخصص گوارش اطفال",
    imageUrl: placeholderDoctorImageUrl3,
    bioSnippet: "استاد یار دانشگاه و محقق در زمینه بیماری‌های گوارشی کودکان."
  }
];

const DoctorsSnippet = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="doctors-snippet"
      className={styles.doctorsSnippet}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>پزشکان متخصص ما</h2>
        <p className={styles.sectionSubtitle}>
          آشنایی با تیم پزشکان مجرب و متعهد کلینیک ما.
        </p>
        <motion.div
          className={styles.doctorsGrid}
          // variants={sectionVariants} // Already applied to parent, children will be staggered
        >
          {doctorsData.slice(0, 3).map(doctor => ( // Show first 3 doctors for snippet
            <motion.div
              key={doctor.id}
              className={styles.doctorCard}
              variants={cardVariants}
            >
              <div className={styles.doctorImageContainer}>
                <img src={doctor.imageUrl} alt={doctor.name} className={styles.doctorImage} />
              </div>
              <div className={styles.doctorInfo}>
                <h3 className={styles.doctorName}>{doctor.name}</h3>
                <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
                <p className={styles.doctorBioSnippet}>{doctor.bioSnippet}</p>
                {/* Optional: Link to full doctor profile page later */}
                {/* <a href={`/doctors/${doctor.id}`} className={styles.profileLink}>مشاهده پروفایل</a> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Optional: Link to full doctors page */}
        {/* <div className={styles.seeAllLinkContainer}>
          <a href="/doctors" className={styles.seeAllLink}>مشاهده همه پزشکان</a>
        </div> */}
      </div>
    </motion.section>
  );
};

export default DoctorsSnippet;
