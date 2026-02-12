import React from 'react';

function ProgramDetails({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <div className="section-title">PROGRAM & COACH DETAILS</div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Program Name</label>
          <textarea
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            placeholder="Describe the program recommended"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Coach Signature / Initials</label>
          <textarea
            name="coachSign"
            value={formData.coachSign}
            onChange={handleInputChange}
            placeholder="Coach name and signature"
          />
        </div>
      </div>

      <div style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '2px solid #d4af37',
        textAlign: 'center',
        color: '#666',
        fontSize: '12px'
      }}>
        <p>This wellness record is confidential and for assessment purposes only.</p>
        <p style={{ marginTop: '10px' }}>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default ProgramDetails;
