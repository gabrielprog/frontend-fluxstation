import React from 'react';
import './style.css'; // Import your CSS file

const Center = ({ children }) => {
  return (
    <div className="center">
      {children}
    </div>
  );
};

export default Center;