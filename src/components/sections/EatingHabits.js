import React from 'react';

function EatingHabits({ formData, handleInputChange }) {
  return (
    <div className="form-section">
      <div className="section-title">EATING HABITS</div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Wake up Time</label>
          <input
            type="text"
            name="wakeUp"
            value={formData.wakeUp}
            onChange={handleInputChange}
            placeholder="e.g., 6:00 AM"
          />
        </div>
        <div className="form-group">
          <label>Tea / Coffee</label>
          <input
            type="text"
            name="teaCoffee"
            value={formData.teaCoffee}
            onChange={handleInputChange}
            placeholder="Frequency and type"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Break Fast</label>
          <input
            type="text"
            name="breakFast"
            value={formData.breakFast}
            onChange={handleInputChange}
            placeholder="What do you eat?"
          />
        </div>
        <div className="form-group">
          <label>Lunch</label>
          <input
            type="text"
            name="lunch"
            value={formData.lunch}
            onChange={handleInputChange}
            placeholder="Lunch details"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Evening Snacks</label>
          <input
            type="text"
            name="eveSnacks"
            value={formData.eveSnacks}
            onChange={handleInputChange}
            placeholder="Snack details"
          />
        </div>
        <div className="form-group">
          <label>Dinner</label>
          <input
            type="text"
            name="dinner"
            value={formData.dinner}
            onChange={handleInputChange}
            placeholder="Dinner details"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Veg / Non Veg Preference</label>
          <select name="vegNonVeg" value={formData.vegNonVeg} onChange={handleInputChange}>
            <option value="">Select preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-vegetarian">Non-Vegetarian</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="form-group">
          <label>Water Intake (Liters/day)</label>
          <input
            type="text"
            name="waterIntake"
            value={formData.waterIntake}
            onChange={handleInputChange}
            placeholder="e.g., 8 liters"
          />
        </div>
      </div>
    </div>
  );
}

export default EatingHabits;
