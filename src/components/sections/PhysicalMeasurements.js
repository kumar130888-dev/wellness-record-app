import React from 'react';

function PhysicalMeasurements({ formData, handleInputChange, bmiData, recalculateMeasurements }) {
  return (
    <div className="form-section">
      <div className="section-title">PHYSICAL MEASUREMENTS</div>
      
      <div className="measurement-box">
        <div className="measurement-label">Body Measurements</div>
        <div className="measurement-group">
          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter height in cm"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in kg"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Body Fat (%)</label>
            <input
              type="number"
              name="bodyFat"
              value={formData.bodyFat}
              onChange={handleInputChange}
              placeholder="Body fat percentage"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Waist (cm)</label>
            <input
              type="number"
              name="waist"
              value={formData.waist}
              onChange={handleInputChange}
              placeholder="Waist circumference"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="measurement-box">
        <div className="measurement-label">Calculated Metrics</div>
        <div className="form-row">
          <div className="form-group">
            <label>BMI</label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              readOnly
              placeholder="Auto-calculated"
              step="0.01"
            />
            {bmiData && (
              <small style={{ color: '#0066cc', marginTop: '5px' }}>
                Status: <strong>{bmiData.status}</strong>
              </small>
            )}
          </div>
          <div className="form-group">
            <label>VF (Visceral Fat Index)</label>
            <input
              type="number"
              name="vf"
              value={formData.vf}
              onChange={handleInputChange}
              placeholder="Visceral fat index"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>BMR (Basal Metabolic Rate)</label>
            <input
              type="number"
              name="bmr"
              value={formData.bmr}
              readOnly
              placeholder="Auto-calculated"
            />
            {bmiData && bmiData.bmr && (
              <small style={{ color: '#0066cc', marginTop: '5px' }}>
                Calories/day
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Body Age (years)</label>
            <input
              type="number"
              name="bodyAge"
              value={formData.bodyAge}
              onChange={handleInputChange}
              placeholder="Biological age"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {bmiData && (
        <div className="bmi-result">
          <p><strong>BMI Analysis:</strong> {bmiData.bmi}</p>
          <p><strong>Status:</strong> {bmiData.status}</p>
          {bmiData.bodyFat && (
            <>
              <p><strong>Body Fat:</strong> {bmiData.bodyFat}%</p>
              <p><strong>Category:</strong> {bmiData.bodyFatStatus}</p>
            </>
          )}
          {bmiData.bmr && <p><strong>BMR:</strong> {bmiData.bmr} calories/day</p>}
        </div>
      )}
    </div>
  );
}

export default PhysicalMeasurements;
