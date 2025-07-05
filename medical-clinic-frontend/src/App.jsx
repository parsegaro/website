import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import DoctorsPage from './pages/DoctorsPage/DoctorsPage';
import BlogListPage from './pages/BlogListPage/BlogListPage';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AppointmentPage from './pages/AppointmentPage/AppointmentPage'; // Import AppointmentPage

// We are not using App.css anymore, global styles are in index.css

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:postId" element={<SinglePostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/appointment" element={<AppointmentPage />} /> {/* Add AppointmentPage route */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
