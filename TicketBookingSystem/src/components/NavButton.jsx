// src/components/NavButton.jsx
import React from 'react';

const NavButton = ({ direction, onClick }) => {
  return (
    <button 
      className="nav-btn" 
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
    >
      {direction === 'prev' ? '❮' : '❯'}
    </button>
  );
};

export default NavButton;