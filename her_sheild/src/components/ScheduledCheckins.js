// ScheduledCheckins.js
import React, { useState, useEffect } from 'react';
import './ScheduledCheckins.css';  // Correct CSS file import

const ScheduledCheckins = () => {
  const [checkinTime, setCheckinTime] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [checkinStarted, setCheckinStarted] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showConfirmCheckin, setShowConfirmCheckin] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  let checkinInterval;
  let checkinTimerId;

  useEffect(() => {
    return () => {
      clearInterval(checkinInterval);
      clearTimeout(checkinTimerId);
    };
  }, [checkinInterval, checkinTimerId]);

  const startCheckin = () => {
    if (!checkinTime || checkinTime <= 0) {
      alert('Please enter a valid time.');
      return;
    }

    if (checkinStarted) {
      alert('Check-in timer is already running.');
      return;
    }

    setTimeRemaining(parseInt(checkinTime));
    setShowTimer(true);
    setShowConfirmCheckin(false);
    setShowAlertMessage(false);
    setCheckinStarted(true);

    checkinInterval = setInterval(updateTimer, 60000);
  };

  const updateTimer = () => {
    setTimeRemaining((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(checkinInterval);
        setShowConfirmCheckin(true);
        checkinTimerId = setTimeout(triggerAlert, 120000);
        return 0;
      }
      return prevTime - 1;
    });
  };

  const confirmSafety = () => {
    clearTimeout(checkinTimerId);
    setShowConfirmCheckin(false);
    alert('Check-in confirmed. Timer reset.');
    startCheckin();
  };

  const triggerAlert = () => {
    setShowAlertMessage(true);
    setShowConfirmCheckin(false);
    console.log('Sending alerts to emergency contacts...');
  };

  return (
    <div className="bgcontainer">
      <div className="content-container">
        <h1>Check Mate</h1>

        <div className="checkin-form">
          <label htmlFor="checkinTime">Set Check-in Interval (in minutes)</label>
          <input
            type="number"
            id="checkinTime"
            value={checkinTime}
            onChange={(e) => setCheckinTime(e.target.value)}
            placeholder="Enter time in minutes"
            min="1"
            required
          />
          <button onClick={startCheckin}>Start Check-in Timer</button>
        </div>

        {showTimer && (
          <div className="checkin-timer">
            <p>
              Next check-in in <span>{timeRemaining}</span> minutes
            </p>
          </div>
        )}

        {showConfirmCheckin && (
          <div className="confirm-checkin">
            <p>Are you safe?</p>
            <button onClick={confirmSafety}>Yes, I'm safe</button>
          </div>
        )}

        {showAlertMessage && (
          <div className="alert">
            <p>No response detected. Sending alert to your emergency contacts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledCheckins;
