import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewCargo from './pages/NewCargo';
import History from './pages/History';
import Drivers from './pages/Drivers';
import Navigation from './components/Navigation';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email || '',
          password: '' // We don't store the password in state
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/dashboard" replace /> : <Login />
        } />
        <Route path="/dashboard" element={
          user ? (
            <>
              <Navigation />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/new-cargo" element={
          user ? (
            <>
              <Navigation />
              <NewCargo />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/history" element={
          user ? (
            <>
              <Navigation />
              <History />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/drivers" element={
          user ? (
            <>
              <Navigation />
              <Drivers />
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
