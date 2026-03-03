// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Intro3D from './components/Intro3D';
import FloatingParticles from './components/FloatingParticles';
import CustomCursor from './components/CustomCursor';
import ClickEffects from './components/ClickEffects';
import './App.css';

/* ScrollToTop component: scrolls to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // State to control showing the 3D intro
  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem('introShown') !== 'true';
  });

  const handleIntroFinish = () => {
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
  };

  // Dark mode toggle state
  const [darkMode, setDarkMode] = useState(true);

  // Optional: handle theme changes automatically if needed
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#000' : '#fff';
    document.body.style.color = darkMode ? '#ffb6c1' : '#000';
  }, [darkMode]);

  // Always render main content; intro overlays on top so home page peeks through
  return (
    <>
      <CustomCursor />
      <ClickEffects />
      {showIntro && <Intro3D onFinish={handleIntroFinish} />}
      <Router>
        <ScrollToTop />
        <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          <FloatingParticles />
          {/* Header with dark mode toggle */}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Main content */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;