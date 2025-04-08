// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import gif from './landing.gif';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  return (
    <div class="bg">
    <div className="full-page-gif" onClick={handleClick}>
      <img 
        src={gif} 
        alt="Landing" 
        className="full-screen-image" 
      />
    </div>
    </div>
  );
};

export default LandingPage;
