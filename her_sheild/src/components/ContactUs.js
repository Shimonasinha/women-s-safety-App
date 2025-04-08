// src/components/ContactUs.js
import React from 'react';
import Navbar from './Navbar';
import './ContactUs.css';
import { FaInstagram, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import contactImage from './contactus1.jpeg';
const ContactUs = () => {
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Contact Section */}
      <div className="contact-container">
        {/* Top Image Section */}
        <div className="contact-image">
          <img src={contactImage} alt="Contact Us" />
        </div>

        

        {/* Contact Information Cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <FaInstagram className="contact-icon instagram" />
            <h3>Instagram</h3>
            <p>
              <a href="https://instagram.com/hershield" target="_blank" rel="noopener noreferrer">
                @hershield
              </a>
            </p>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon address" />
            <h3>Our Location</h3>
            <p>123 Main Street, Paris, France 75001</p>
          </div>

          <div className="contact-card">
            <FaPhoneAlt className="contact-icon phone" />
            <h3>Phone Number</h3>
            <p>+33 1 23 45 67 89</p>
          </div>
        </div>
      </div>
      
      
    </>
  );
};

export default ContactUs;
