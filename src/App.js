import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import WellnessForm from './components/WellnessForm';
import { recordService } from './services/recordService';

function AppContent() {
  const { user, loading } = useAuth();
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
    const { logout } = useAuth();
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

  return currentView === 'dashboard' ? (
    <Dashboard
      onSelectRecord={setSelectedRecordId}
      onLogout={handleLogout}
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
