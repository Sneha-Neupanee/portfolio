import React from 'react';
import '../styles/Card.css';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div className={`custom-card ${hover ? 'card-hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;