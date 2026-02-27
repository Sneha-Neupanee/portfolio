import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  FolderOpen,
  Zap,
  Briefcase,
  Mail,
  Sun,
  Moon,
} from 'lucide-react';
import '../styles/Header.css';

const navLinks = [
  { name: 'Home',       path: '/',           Icon: Home       },
  { name: 'About',      path: '/about',       Icon: User       },
  { name: 'Projects',   path: '/projects',    Icon: FolderOpen },
  { name: 'Skills',     path: '/skills',      Icon: Zap        },
  { name: 'Experience', path: '/experience',  Icon: Briefcase  },
  { name: 'Contact',    path: '/contact',     Icon: Mail       },
];

const Header = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  return (
    <header className="header">

      {/* ════ SHARED WRAPPER ════ */}
      <div className="header-container">

        {/* ── Logo ── */}
        <Link to="/" className="logo">
          <span className="logo-text">Sneha Neupane</span>
        </Link>

        {/* ── Desktop nav: text links (hidden on mobile) ── */}
        <nav className="nav" aria-label="Primary navigation">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link${location.pathname === path ? ' active' : ''}`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/* ── Theme toggle ── */}
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode
              ? <Sun  size={18} strokeWidth={1.75} />
              : <Moon size={18} strokeWidth={1.75} />
            }
            <span className="theme-label">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>

      </div>

      {/* ════ MOBILE-ONLY ROW 2 — icon nav pill ════ */}
      <div className="mobile-nav-row" aria-hidden="false">
        <nav className="mobile-nav-pill" aria-label="Mobile navigation">
          {navLinks.map(({ name, path, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`mobile-nav-icon${location.pathname === path ? ' active' : ''}`}
              aria-label={name}
              title={name}
            >
              <Icon size={19} strokeWidth={1.75} />
              <span className="mobile-nav-tooltip">{name}</span>
            </Link>
          ))}
        </nav>
      </div>

    </header>
  );
};

export default Header;