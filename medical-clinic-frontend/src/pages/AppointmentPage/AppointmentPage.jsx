import React, { useState, useEffect } from 'react';
import styles from './AppointmentPage.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Sample data (can be imported from a shared location later)
const servicesData = [
  { id: 1, name: "آندوسکوپی و کولونوسکوپی" },
  { id: 2, name: "اکوکاردیوگرافی قلب" },
  { id: 3, name: "نوار قلب (ECG)" },
  { id: 4, name: "پولیپکتومی" },
  { id: 5, name: "مشاوره گوارش عمومی" },
  { id: 6, name: "مشاوره قلب عمومی" },
];
const doctorsData = [
  { id: 1, name: "دکتر مریم احمدی", specialtyIds: [1, 4, 5] }, // Assuming specialtyIds link to servicesData ids
  { id: 2, name: "دکتر علی رضایی", specialtyIds: [2, 3, 6] },
  { id: 3, name: "دکتر سارا محمدی", specialtyIds: [1, 5] }, // Example: Specializes in some general and some specific
  { id: 4, name: "دکتر بهنام کریمی", specialtyIds: [1, 4, 5] },
];

// Helper to get available times (sample)
const getAvailableTimes = (date, serviceId, doctorId) => {
  // This is a placeholder. In a real app, this would query the backend.
  console.log("Fetching times for:", date, serviceId, doctorId);
  if (!date) return [];
  // Sample times, can be made more dynamic based on date/doctor
  return ["۰۹:۰۰", "۰۹:۳۰", "۱۰:۰۰", "۱۰:۳۰", "۱۱:۰۰", "۱۴:۰۰", "۱۴:۳۰", "۱۵:۰۰"];
};


const AppointmentPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({ name: '', phone: '', notes: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (inView) { controls.start('visible'); }
    window.scrollTo(0, 0);
  }, [controls, inView]);

  useEffect(() => {
    if (selectedService) {
      const doctorsForService = doctorsData.filter(doc => doc.specialtyIds.includes(parseInt(selectedService)));
      setAvailableDoctors(doctorsForService);
      setSelectedDoctor(''); // Reset doctor if service changes
    } else {
      setAvailableDoctors([]);
    }
  }, [selectedService]);

  useEffect(() => {
    if (selectedDate && selectedService) { // Doctor selection can be optional here
      const times = getAvailableTimes(selectedDate, selectedService, selectedDoctor);
      setAvailableTimes(times);
      setSelectedTime(''); // Reset time
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, selectedService, selectedDoctor]);


  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  const handlePatientDetailChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitAppointment = () => {
    if (!selectedService || !selectedDate || !selectedTime || !patientDetails.name || !patientDetails.phone) {
      alert("لطفاً تمامی اطلاعات لازم را تکمیل کنید.");
      return;
    }
    console.log("Appointment Submitted:", {
      service: servicesData.find(s => s.id === parseInt(selectedService))?.name,
      doctor: doctorsData.find(d => d.id === parseInt(selectedDoctor))?.name || "هر پزشکی",
      date: selectedDate,
      time: selectedTime,
      patient: patientDetails,
    });
    setIsSubmitted(true);
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (isSubmitted) {
    return (
      <motion.div className={styles.appointmentPage} initial="hidden" animate="visible" variants={pageVariants}>
        <div className={styles.pageHeader}><h1>درخواست نوبت شما ثبت شد</h1></div>
        <div className={styles.submissionSuccess}>
          <p>از اینکه کلینیک ما را انتخاب کردید متشکریم.</p>
          <p>خلاصه درخواست شما:</p>
          <ul>
            <li><strong>خدمت:</strong> {servicesData.find(s => s.id === parseInt(selectedService))?.name}</li>
            <li><strong>پزشک:</strong> {doctorsData.find(d => d.id === parseInt(selectedDoctor))?.name || "اولین پزشک در دسترس"}</li>
            <li><strong>تاریخ:</strong> {selectedDate}</li>
            <li><strong>ساعت:</strong> {selectedTime}</li>
            <li><strong>نام بیمار:</strong> {patientDetails.name}</li>
          </ul>
          <p>همکاران ما به زودی برای تایید نهایی با شما تماس خواهند گرفت.</p>
          <Link to="/" className={styles.homeLink}>بازگشت به صفحه اصلی</Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.appointmentPage}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={pageVariants}
    >
      <div className={styles.pageHeader}>
        <h1>رزرو نوبت آنلاین</h1>
        <p className={styles.pageSubtitle}>به راحتی و در چند مرحله نوبت خود را رزرو کنید.</p>
      </div>

      <div className={styles.appointmentFormContainer}>
        {/* Step 1: Select Service */}
        {step === 1 && (
          <motion.div className={styles.formStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>مرحله ۱: انتخاب خدمت</h2>
            <div className={styles.formGroup}>
              <label htmlFor="service">خدمت مورد نظر:</label>
              <select id="service" value={selectedService} onChange={e => setSelectedService(e.target.value)} required>
                <option value="">یک خدمت را انتخاب کنید</option>
                {servicesData.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </div>
            <button onClick={handleNextStep} disabled={!selectedService} className={styles.navButton}>بعدی</button>
          </motion.div>
        )}

        {/* Step 2: Select Doctor (Optional) & Date/Time */}
        {step === 2 && (
          <motion.div className={styles.formStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>مرحله ۲: انتخاب پزشک و زمان</h2>
            {availableDoctors.length > 0 && (
              <div className={styles.formGroup}>
                <label htmlFor="doctor">پزشک (اختیاری):</label>
                <select id="doctor" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
                  <option value="">هر پزشکی / اولین در دسترس</option>
                  {availableDoctors.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className={styles.formGroup}>
              <label htmlFor="date">تاریخ:</label>
              <input type="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required
                     min={new Date().toISOString().split('T')[0]} /> {/* Prevent past dates */}
            </div>
            {selectedDate && availableTimes.length > 0 && (
              <div className={styles.formGroup}>
                <label htmlFor="time">ساعت:</label>
                <select id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required>
                  <option value="">یک زمان را انتخاب کنید</option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            )}
            {selectedDate && availableTimes.length === 0 && <p className={styles.infoText}>زمانی برای این تاریخ موجود نیست یا تاریخ را انتخاب کنید.</p>}
            <div className={styles.stepNav}>
              <button onClick={handlePrevStep} className={styles.navButton}>قبلی</button>
              <button onClick={handleNextStep} disabled={!selectedDate || !selectedTime} className={styles.navButton}>بعدی</button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Patient Details */}
        {step === 3 && (
          <motion.div className={styles.formStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>مرحله ۳: اطلاعات شما</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name">نام و نام خانوادگی:</label>
              <input type="text" id="name" name="name" value={patientDetails.name} onChange={handlePatientDetailChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">شماره تماس:</label>
              <input type="tel" id="phone" name="phone" value={patientDetails.phone} onChange={handlePatientDetailChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="notes">توضیحات بیشتر (اختیاری):</label>
              <textarea id="notes" name="notes" rows="4" value={patientDetails.notes} onChange={handlePatientDetailChange}></textarea>
            </div>
            <div className={styles.stepNav}>
              <button onClick={handlePrevStep} className={styles.navButton}>قبلی</button>
              <button onClick={handleSubmitAppointment} className={styles.submitButtonFinal}>ثبت نهایی درخواست</button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AppointmentPage;
