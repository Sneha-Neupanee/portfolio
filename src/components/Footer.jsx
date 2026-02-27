import React, { useState } from 'react';
import '../styles/Footer.css';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Sneha-Neupanee', icon: <GithubIcon /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sneha-neupane-93b065269/', icon: <LinkedInIcon /> },
    { name: 'Email', url: 'mailto:sneha.neupane@example.com', icon: <EmailIcon /> },
  ];

  return (
    <footer className="footer">
      <div className="footer__top-line" />

      <div className="footer__container">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <p className="footer__name">Sneha Neupane</p>
            <p className="footer__tagline">Developer &amp; Designer</p>
            <div className="footer__rule" />
            <p className="footer__bio">
              Crafting thoughtful digital experiences through clean code and considered design.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__section">
            <p className="footer__section-title">Navigation</p>
            <ul className="footer__nav-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`footer__nav-link${hoveredLink === link.label ? ' footer__nav-link--hovered' : ''}`}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer__section">
            <p className="footer__section-title">Connect</p>
            <div className="footer__social-list">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer__social-link${hoveredSocial === s.name ? ' footer__social-link--hovered' : ''}`}
                  onMouseEnter={() => setHoveredSocial(s.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <span className={`footer__social-icon${hoveredSocial === s.name ? ' footer__social-icon--hovered' : ''}`}>
                    {s.icon}
                  </span>
                  {s.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Sneha Neupane. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed &amp; built with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;