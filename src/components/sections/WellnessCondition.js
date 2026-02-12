import React from 'react';

function WellnessCondition({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <div className="section-title">WELLNESS CONDITION</div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Personal Problems</label>
          <textarea
            name="personalProblems"
            value={formData.personalProblems}
            onChange={handleInputChange}
            placeholder="Describe any personal issues"
          />
        </div>
        <div className="form-group">
          <label>Any Medicines</label>
          <textarea
            name="anyMedicines"
            value={formData.anyMedicines}
            onChange={handleInputChange}
            placeholder="Current medications"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Blood Pressure</label>
          <input
            type="text"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleInputChange}
            placeholder="e.g., 120/80 mmHg"
          />
        </div>
        <div className="form-group">
          <label>Sugar Level (mg/dL)</label>
          <input
            type="text"
            name="sugar"
            value={formData.sugar}
            onChange={handleInputChange}
            placeholder="Enter sugar level"
          />
        </div>
        <div className="form-group">
          <label>Cardiac Status</label>
          <input
            type="text"
            name="cardiac"
            value={formData.cardiac}
            onChange={handleInputChange}
            placeholder="Heart condition details"
          />
        </div>
      </div>

      <div className="form-section">
        <h4 style={{ marginBottom: '15px', color: '#333' }}>Health Issues (Check if present)</h4>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="tiredness"
              id="tiredness"
              checked={formData.tiredness}
              onChange={handleInputChange}
            />
            <label htmlFor="tiredness">Tiredness</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="headache"
              id="headache"
              checked={formData.headache}
              onChange={handleInputChange}
            />
            <label htmlFor="headache">Headache</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="giddiness"
              id="giddiness"
              checked={formData.giddiness}
              onChange={handleInputChange}
            />
            <label htmlFor="giddiness">Giddiness</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="gastritis"
              id="gastritis"
              checked={formData.gastritis}
              onChange={handleInputChange}
            />
            <label htmlFor="gastritis">Gastritis</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="acidity"
              id="acidity"
              checked={formData.acidity}
              onChange={handleInputChange}
            />
            <label htmlFor="acidity">Acidity</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="indigestion"
              id="indigestion"
              checked={formData.indigestion}
              onChange={handleInputChange}
            />
            <label htmlFor="indigestion">Indigestion</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="constipation"
              id="constipation"
              checked={formData.constipation}
              onChange={handleInputChange}
            />
            <label htmlFor="constipation">Constipation</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="breathingProblem"
              id="breathingProblem"
              checked={formData.breathingProblem}
              onChange={handleInputChange}
            />
            <label htmlFor="breathingProblem">Breathing Problem</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="sleepingDisorder"
              id="sleepingDisorder"
              checked={formData.sleepingDisorder}
              onChange={handleInputChange}
            />
            <label htmlFor="sleepingDisorder">Sleeping Disorder</label>
          </div>
        </div>

        <div className="form-row" style={{ marginTop: '15px' }}>
          <div className="checkbox-item">
            <input
              type="checkbox"
              name="pain"
              id="pain"
              checked={formData.pain}
              onChange={handleInputChange}
            />
            <label htmlFor="pain">Pain</label>
          </div>
        </div>

        {formData.pain && (
          <div className="form-row">
            <div className="form-group">
              <label>Pain Location</label>
              <textarea
                name="painLocation"
                value={formData.painLocation}
                onChange={handleInputChange}
                placeholder="Body/Shoulder/Neck/Back/Knee/Heel"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WellnessCondition;
