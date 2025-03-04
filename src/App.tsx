import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './pages/Leaderboard';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;