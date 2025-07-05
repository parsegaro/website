import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import AboutUsSnippet from '../components/AboutUsSnippet/AboutUsSnippet';
import DoctorsSnippet from '../components/DoctorsSnippet/DoctorsSnippet';

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts, useful if navigating from other pages
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutUsSnippet />
      <DoctorsSnippet />
    </>
  );
};

export default HomePage;
