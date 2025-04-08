// src/components/HomePageWithProfile.js
import React from 'react';
import Navbar from './Navbar';
import MainContent from './MainContent';
import Footer from './Footer';

const HomePageWithProfile = () => {
  return (
    <>
    <div className="home-page">
      <Navbar showProfile={true} />
      <MainContent />
      <Footer />
      </div>
    </>
  );
};

export default HomePageWithProfile;
