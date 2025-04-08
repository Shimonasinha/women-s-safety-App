import React from 'react';
import Navbar from './Navbar'; // Ensure correct path to Navbar
import './About.css'; // Add your styles in this CSS file
import aboutus from './aboutusnew.jpeg'; // Ensure the image path is correct


const AboutUs = () => {
  return (
    <div className="page-container">
      {/* Navbar at the top */}
      <Navbar />

      {/* Scrollable About Us Content */}
      <div className="about-us-container">
        <div className="about-us-content">
          <h1>About Us</h1> {/* Heading added here */}
          <p>
            Our mission is to empower women and create a safer world through innovative technology. 
            We provide tools and resources that focus on women's safety, mental well-being, and emergency support.
            Our goal is to equip women with the resources they need to feel confident and secure in any situation.
          </p>
          <p>
            With a commitment to privacy, safety, and empowerment, we aim to make a positive difference in women's lives.
            We believe that through technology, we can create a world where women feel safe, strong, and supported at all times.
          </p>

          <div className="mission-statement">
            <h2>Our Mission</h2>
            <p>
              To provide accessible safety solutions that help women feel protected, 
              whether at home, at work, or on the go. We work towards creating a world where women’s safety is a priority.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="about-us-image">
          <img src={aboutus} alt="Women Safety" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;