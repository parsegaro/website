import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage/ServicesPage';

// We are not using App.css anymore, global styles are in index.css

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Use HomePage component */}
          <Route path="/services" element={<ServicesPage />} />
          {/* Define other routes here later, e.g., /doctors, /blog, /contact */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
