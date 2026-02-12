import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Sneha-Neupanee',
      icon: '💻'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sneha-neupane-93b065269/',
      icon: '💼'
    },
    {
      name: 'Email',
      url: 'mailto:sneha.neupane@example.com',
      icon: '📧'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Sneha Neupane</h3>
            <p className="tagline">Building dreams with code</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/skills">Skills</a>
            <a href="/experience">Experience</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link" title={social.name}>
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Sneha Neupane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;