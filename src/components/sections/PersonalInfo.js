import React from 'react';

function PersonalInfo({ formData, handleInputChange, handlePhotoUpload, photoDataUrl }) {
  return (
    <div className="form-section">
      <div className="section-title">PERSONAL INFORMATION</div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Record No. *</label>
          <input
            type="text"
            name="recordNo"
            value={formData.recordNo}
            onChange={handleInputChange}
            placeholder="Enter record number"
          />
        </div>
        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter full name"
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Enter age"
            min="0"
            max="150"
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Mobile No.</label>
          <input
            type="tel"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
          />
        </div>
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Referred by</label>
          <input
            type="text"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleInputChange}
            placeholder="Enter referral source"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="photo-upload form-group">
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          <div className="photo-preview">
            {photoDataUrl ? (
              <img src={photoDataUrl} alt="Patient" />
            ) : (
              <div className="no-photo">No photo uploaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
