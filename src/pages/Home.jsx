import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlePlayground from '../components/ParticlePlayground';
import '../styles/Home.css';

const Home = () => {
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer & Creative Coder";
  const [index, setIndex] = useState(0);
  
  const [gameTreatText, setGameTreatText] = useState('');
  const gameTreatFullText = "A little game treat";
  const [gameTreatIndex, setGameTreatIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  useEffect(() => {
    if (gameTreatIndex < gameTreatFullText.length) {
      const timeout = setTimeout(() => {
        setGameTreatText(prev => prev + gameTreatFullText[gameTreatIndex]);
        setGameTreatIndex(gameTreatIndex + 1);
      }, 80);
      
      return () => clearTimeout(timeout);
    }
  }, [gameTreatIndex, gameTreatFullText]);

  return (
    <div className="home-page">
      <div className="particles-container">
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

      <div className="game-section">
        <h2 className="game-treat-heading">
          {gameTreatText}<span className="cursor-blink-game">|</span>
        </h2>
        <ParticlePlayground />
        <p className="game-description">
          Interactive physics-based particle system built with React and HTML5 Canvas.
        </p>
      </div>

      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="arrow-down"></div>
      </div>
    </div>
  );
};

export default Home;