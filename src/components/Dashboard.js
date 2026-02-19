import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { recordService } from '../services/recordService';
import '../styles/Dashboard.css';

function Dashboard({ onSelectRecord, onViewMeasurements, onLogout }) {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, [user]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRecords(records);
    } else {
      const filtered = records.filter(
        (record) =>
          record.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    }
  }, [searchTerm, records]);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const userRecords = await recordService.getUserRecords(user.uid);
      setRecords(userRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
      alert('Error fetching records');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await recordService.deleteRecord(recordId);
        setRecords(records.filter((r) => r.id !== recordId));
        alert('Record deleted successfully');
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Error deleting record');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>WELLNESS RECORD SYSTEM</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by patient name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="button-group">
          <button 
            onClick={() => onSelectRecord(null)} 
            className="btn-new-record"
          >
            + Create New Record
          </button>
          <button 
            onClick={onViewMeasurements} 
            className="btn-measurements"
          >
            📊 Weekly Measurements
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading records...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="no-records">
            <p>No records found</p>
            <button 
              onClick={() => onSelectRecord(null)}
              className="btn-create"
            >
              Create your first record
            </button>
          </div>
        ) : (
          <div className="records-list">
            <table className="records-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.name || 'N/A'}</td>
                    <td>{record.email || 'N/A'}</td>
                    <td>{record.age || 'N/A'}</td>
                    <td>
                      {record.createdAt
                        ? new Date(record.createdAt.toDate()).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>
                      <button
                        onClick={() => onSelectRecord(record.id)}
                        className="btn-view"
                      >
                        View/Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
