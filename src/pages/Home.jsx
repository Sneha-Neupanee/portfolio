import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlePlayground from '../components/ParticlePlayground';
import '../styles/Home.css';

const Home = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer & Creative Coder";
  const [index, setIndex] = useState(0);

  // Time feature
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const myTZ = "Asia/Kathmandu";

  const getGMTOffset = (tz) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(now);
    const offsetPart = parts.find(part => part.type === 'timeZoneName');
    return offsetPart ? offsetPart.value : 'GMT+00:00';
  };

  const formatTime = (date, tz) => new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  // Theme system
  const colors = {
    pink: "#FFB6C1",
    red: "#ff4d4d",
    yellow: "#FFD700",
    blue: "#4da3ff",
    orange: "#ff944d",
  };

  const [theme, setTheme] = useState("pink");

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className="home-page" style={{ "--theme-color": colors[theme] }}>
      <div className="particles-container">
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
        <div className="particle"></div><div className="particle"></div>
      </div>

      <div className="home-content">
        {/* Left Side */}
        <div className="hero-text">
          <h1 className="hero-title">Hi! I'm <span className="name-highlight">Sneha Neupane</span></h1>
          <p className="hero-subtitle">{text}<span className="cursor-blink">|</span></p>
          <p className="hero-description">
            I turn ideas into working products using code, data, and design. 
            Focused on building systems that truly deliver value and feel alive.
          </p>

          <div className="time-box">
            <div className="time-row">
              <span className="time-label" style={{ color: 'var(--theme-color)' }}>My Time</span>
              <span className="time-value">
                {formatTime(now, myTZ)} <span className="timezone">({getGMTOffset(myTZ)})</span>
              </span>
            </div>
            <div className="time-row">
              <span className="time-label" style={{ color: 'var(--theme-color)' }}>Your Time</span>
              <span className="time-value">
                {formatTime(now, Intl.DateTimeFormat().resolvedOptions().timeZone)} 
                <span className="timezone">({getGMTOffset(Intl.DateTimeFormat().resolvedOptions().timeZone)})</span>
              </span>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/projects">
              <button className="custom-btn btn-primary">View My Work</button>
            </Link>
            <Link to="/contact">
              <button className="custom-btn btn-secondary">Get In Touch</button>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="hero-image">
          <div className="image-container">
            {/* Color Palette - Moved a bit higher */}
            <div className="color-dots-container">
              <div className="color-dots">
                {Object.keys(colors).map((c) => (
                  <div 
                    key={c} 
                    className={`color-dot ${theme === c ? 'active' : ''}`}
                    style={{ background: colors[c] }} 
                    onClick={() => setTheme(c)}
                    title={c.charAt(0).toUpperCase() + c.slice(1)}
                  />
                ))}
              </div>
            </div>

            {/* Floating Image */}
            <div className="image-wrapper">
              <img src="/profile.jpg" alt="Sneha Neupane" />
              <div className="image-backdrop"></div>
            </div>
          </div>
        </div>
      </div>

      <ParticlePlayground />
    </div>
  );
};

export default Home;