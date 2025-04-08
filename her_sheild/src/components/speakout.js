 import React from "react";
import "./speakout.css";


function App() {
  return (
    <div className="background">
      <h1 className="title" id="name">SpeakOut!</h1>
      <form className="report-form">
        <div className="form-group">
          <label>Type of Incident</label>
          <input type="text" placeholder="Enter incident type" />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" placeholder="Enter location" />
        </div>
        <div className="form-group">
          <label>Describe</label>
          <textarea placeholder="Describe the incident" />
        </div>
        <div className="form-group">
          <label>Upload Proof (optional)</label>
          <input type="file" />
        </div>
        <button type="submit" className="report-button">Report</button>
      </form>
    </div>
  );
}

export default App;