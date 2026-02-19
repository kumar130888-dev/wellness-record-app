import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import WellnessForm from './components/WellnessForm';
import MeasurementTracker from './components/MeasurementTracker';
import { recordService } from './services/recordService';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [authMode, setAuthMode] = useState('login');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [recordData, setRecordData] = useState(null);

  useEffect(() => {
    if (selectedRecordId) {
      loadRecord();
    } else {
      setRecordData(null);
    }
  }, [selectedRecordId]);

  const loadRecord = async () => {
    try {
      // For editing an existing record, we need to fetch it
      // This would be implemented based on your needs
      setRecordData(null);
    } catch (error) {
      console.error('Error loading record:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentView('dashboard');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  if (!user) {
    return authMode === 'login' ? (
      <Login onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <Signup onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  const handleSelectRecord = (recordId) => {
    setSelectedRecordId(recordId);
    setCurrentView('form');
  };

  const handleViewMeasurements = () => {
    setCurrentView('measurements');
  };

  return currentView === 'dashboard' ? (
    <Dashboard
      onSelectRecord={handleSelectRecord}
      onViewMeasurements={handleViewMeasurements}
      onLogout={handleLogout}
    />
  ) : currentView === 'measurements' ? (
    <MeasurementTracker
      onBack={() => {
        setCurrentView('dashboard');
      }}
    />
  ) : (
    <WellnessForm
      recordId={selectedRecordId}
      onBack={() => {
        setCurrentView('dashboard');
        setSelectedRecordId(null);
      }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
