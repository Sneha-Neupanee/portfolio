import React from 'react';
import '../styles/Button.css';

const Button = ({ children, onClick, variant = 'primary', href, type = 'button', ...props }) => {
  const buttonClass = `custom-btn btn-${variant}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClass}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type}
      className={buttonClass} 
      onClick={onClick} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;