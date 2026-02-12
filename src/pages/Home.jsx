import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlePlayground from '../components/ParticlePlayground';
import '../styles/Home.css';

const Home = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer & Creative Coder";
  const [index, setIndex] = useState(0);


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
    <div className="home-page">
      <div className="particles-container">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="home-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="name-highlight">Sneha Neupane</span>
          </h1>
          <p className="hero-subtitle">{text}<span className="cursor-blink">|</span></p>
          <p className="hero-description">
            Crafting beautiful, functional web experiences with passion and creativity.
            From front-end magic to back-end logic, I bring ideas to life.
          </p>

          <div className="cta-buttons">
            <Link to="/projects">
              <button className="custom-btn btn-primary">
                View My Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="custom-btn btn-secondary">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <img src="/profile.jpg" alt="Sneha Neupane" />
            <div className="image-backdrop"></div>
          </div>
        </div>
      </div>

      <ParticlePlayground />


    </div>
  );
};

export default Home;