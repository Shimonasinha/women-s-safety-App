import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Login from './components/Login_page';
import SignUp from './components/SignUp';
import ContactUs from './components/ContactUs';
import EmergencyContacts from './components/EmergencyContacts';
import SpeakOut from './components/speakout';
import ScheduledCheckins from './components/ScheduledCheckins';
import Profile from './components/Profile';
import HomePageWithProfile from './components/HomePageWithProfile';
import UserContext from './context/UserContext';
 // Import UserContext to access the user's login status


const HomePage = () => {
  return (
    <>
      <Navbar />
      <MainContent />
      <Footer />
    </>
  );
};

const App = () => {
  const { user, setUser } = useContext(UserContext); // Get user and setUser from context to check if logged in

  // Check for user session in localStorage or any persisted storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Persist the user in context
    }
  }, [setUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/home" element={user ? <HomePageWithProfile /> : <HomePage />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/emergency-contact" element={<EmergencyContacts />} />
        <Route path="/speak-out" element={<SpeakOut />} />
        <Route path="/check-mate" element={<ScheduledCheckins />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;




