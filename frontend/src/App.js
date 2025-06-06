import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import ReservationPage from './components/ReservationPage';
import AvailabilityPage from './components/AvailabilityPage';

function App() {
  const [user, setUser] = useState(null);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <nav style={{
        backgroundColor: '#2c3e50',
        padding: '10px',
        marginBottom: '20px'
      }}>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></li>
          <li><Link to="/reserve" style={{ color: 'white', textDecoration: 'none' }}>Reserve</Link></li>
          <li><Link to="/availability" style={{ color: 'white', textDecoration: 'none' }}>Availability</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<RegistrationPage setUser={setUser} />} />
        <Route
          path="/reserve"
          element={<ProtectedRoute><ReservationPage user={user} /></ProtectedRoute>}
        />
        <Route path="/availability" element={<AvailabilityPage />} />
      </Routes>
    </Router>
  );
}

export default App;