import React, { useEffect, useState } from 'react';
import styles from './ContactPage.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
    window.scrollTo(0, 0);
  }, [controls, inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (can be expanded)
    if (formData.name && formData.email && formData.subject && formData.message) {
      console.log("Form data submitted:", formData); // Placeholder for actual submission
      setIsSubmitted(true);
      // Reset form (optional)
      // setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      alert("لطفاً تمامی فیلدها را پر کنید.");
    }
  };


  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  };
   const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };


  return (
    <motion.div
      className={styles.contactPage}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <div className={styles.pageHeader}>
        <motion.h1 variants={itemVariants}>تماس با ما</motion.h1>
        <motion.p variants={itemVariants} className={styles.pageSubtitle}>
          ما همیشه آماده پاسخگویی به سوالات شما و ارائه بهترین خدمات هستیم.
        </motion.p>
      </div>

      <div className={styles.contactContentWrapper}>
        <motion.div className={styles.contactInfoSection} variants={itemVariants}>
          <h3>اطلاعات تماس کلینیک</h3>
          <p><strong>آدرس:</strong> تهران، خیابان سلامت، کوچه بهار، پلاک ۱۲، طبقه ۳</p>
          <p><strong>تلفن:</strong> <a href="tel:02112345678">۰۲۱-۱۲۳۴۵۶۷۸</a></p>
          <p><strong>ایمیل:</strong> <a href="mailto:info@yourclinic.com">info@yourclinic.com</a></p>
          <p><strong>ساعات کاری:</strong> شنبه تا چهارشنبه، ۹ صبح تا ۶ عصر</p>

          <div className={styles.mapPlaceholder}>
            <p>(محل قرارگیری نقشه گوگل)</p>
            {/* Replace with actual Google Maps embed later */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.690999506005!2d51.38958081520968!3d35.70902098018806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00b1a3f0d0c1%3A0x7b9e9b0f0b0c0d0!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1627890123456!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              title="موقعیت کلینیک روی نقشه"
            ></iframe>
          </div>
        </motion.div>

        <motion.div className={styles.contactFormSection} variants={itemVariants}>
          <h3>ارسال پیام به ما</h3>
          {isSubmitted ? (
            <div className={styles.submissionSuccess}>
              <p>پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">نام و نام خانوادگی:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">ایمیل:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">موضوع:</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">متن پیام:</label>
                <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>ارسال پیام</button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
