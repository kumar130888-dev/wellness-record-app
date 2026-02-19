import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { measurementService } from '../services/measurementService';
import '../styles/MeasurementTracker.css';

function MeasurementTracker({ onBack }) {
  const { user } = useAuth();
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyAge: '',
    bodyFat: '',
    vf: '',
    notes: '',
  });

  useEffect(() => {
    loadMeasurements();
  }, [user]);

  const loadMeasurements = async () => {
    try {
      setLoading(true);
      const userMeasurements = await measurementService.getUserMeasurements(user.uid);
      setMeasurements(userMeasurements);
    } catch (error) {
      console.error('Error loading measurements:', error);
      alert('Error loading measurements');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.weight || !formData.bodyAge || !formData.bodyFat || !formData.vf) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      await measurementService.addMeasurement(user.uid, formData);
      alert('Measurement saved successfully!');
      
      // Reset form and reload measurements
      setFormData({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        bodyAge: '',
        bodyFat: '',
        vf: '',
        notes: '',
      });
      setShowForm(false);
      loadMeasurements();
    } catch (error) {
      console.error('Error saving measurement:', error);
      alert('Error saving measurement: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (measurementId) => {
    if (window.confirm('Delete this measurement?')) {
      try {
        await measurementService.deleteMeasurement(measurementId);
        setMeasurements(measurements.filter((m) => m.id !== measurementId));
        alert('Measurement deleted');
      } catch (error) {
        console.error('Error deleting measurement:', error);
        alert('Error deleting measurement');
      }
    }
  };

  return (
    <div className="measurement-tracker">
      <div className="tracker-header">
        <h1>Weekly Measurements</h1>
        <button onClick={onBack} className="btn-back">← Back to Dashboard</button>
      </div>

      <div className="tracker-content">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn-new-measurement"
        >
          {showForm ? 'Cancel' : '+ Add New Measurement'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="measurement-form">
            <h2>Record New Measurement</h2>
            
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="e.g., 75.5"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Body Age (years) *</label>
                <input
                  type="number"
                  name="bodyAge"
                  placeholder="e.g., 35"
                  value={formData.bodyAge}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Body Fat (%) *</label>
                <input
                  type="number"
                  name="bodyFat"
                  placeholder="e.g., 20.5"
                  value={formData.bodyFat}
                  onChange={handleInputChange}
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Visceral Fat (VF) *</label>
                <input
                  type="number"
                  name="vf"
                  placeholder="e.g., 8"
                  value={formData.vf}
                  onChange={handleInputChange}
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                placeholder="Any additional notes (optional)"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
              />
            </div>

            <button 
              type="submit"
              className="btn-save"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Measurement'}
            </button>
          </form>
        )}

        <div className="measurements-list">
          <h2>Measurement History</h2>
          
          {loading ? (
            <div className="loading">Loading measurements...</div>
          ) : measurements.length === 0 ? (
            <div className="no-data">
              <p>No measurements recorded yet.</p>
              <p>Start tracking your weekly measurements to see progress!</p>
            </div>
          ) : (
            <table className="measurements-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight (kg)</th>
                  <th>Body Age</th>
                  <th>Body Fat (%)</th>
                  <th>VF</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((measurement) => (
                  <tr key={measurement.id}>
                    <td>{new Date(measurement.date).toLocaleDateString()}</td>
                    <td>{measurement.weight}</td>
                    <td>{measurement.bodyAge}</td>
                    <td>{measurement.bodyFat}</td>
                    <td>{measurement.vf}</td>
                    <td className="notes-cell">{measurement.notes || '-'}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(measurement.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeasurementTracker;
