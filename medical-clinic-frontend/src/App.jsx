import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import Footer from './components/Footer/Footer';
// We are not using App.css anymore, global styles are in index.css
// import './App.css'; // This line can be removed if it exists

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        {/* Other sections will be added here later */}
      </main>
      <Footer />
    </>
  );
}

export default App;
