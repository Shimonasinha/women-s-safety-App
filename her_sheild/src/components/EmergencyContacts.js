import React, { useState } from"react";
import "./EmergencyContacts.css"; // Make sure you have the styles in App.css
import emergency from "./emergency.jpeg"

function EmergencyContacts() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleAddContact = (e) => {
    e.preventDefault();
    // Logic to add contact goes here
    console.log("Contact Name:", name);
    console.log("Contact Number:", number);
    setName("");
    setNumber("");
  };

  return (
    <div class="all">
    <div className="backgroundall-container">
      <div className="form-container">
        <h2>Emergency Contacts</h2>
        <form onSubmit={handleAddContact}>
          <div className="input-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              id="contactName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-contact-button">
            Add Contact
          </button>
        </form>

      </div>
      <div class="image">
       < img src={emergency} alt="emergency"/>
      </div>
    </div>
    </div>
  );
}

export default EmergencyContacts;