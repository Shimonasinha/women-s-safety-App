import React, { useState } from 'react';
import './Profile.css';

function ProfilePage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleUpdate = () => {
    // Basic validation
    if (password !== repeatPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address!');
      return;
    }
    // Clear error message if validation passes
    setError('');
    alert('Profile information updated successfully!');
  };

  return (
    <div className="back">
      <div className="profile-container">
        <div className="profile-header">
          <h1>PROFILE</h1>
        </div>

        <div className="main-content">
          {/* Left Side - Profile Picture and Social */}
          <div className="profile-section">
            <div className="avatar-section">
              <div className="avatar">
                {/* Replace with your own image */}
                <img
                  src="https://i.pinimg.com/736x/8b/1f/9f/8b1f9f145889835124f968a6aa82b79f.jpg"
                  alt="Profile"
                  className="avatar-image"
                />
              </div>
              <div className="greeting">
                <p>Hi,</p>
                <p className="username">{username}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="form-section">
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>E-mail:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Repeat Password:</label>
              <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>About Me:</label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </div>

            <button className="update-button" onClick={handleUpdate}>
              Update Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
