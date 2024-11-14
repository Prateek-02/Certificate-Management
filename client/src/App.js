import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'; // For protecting routes
import './App.css';  // Optional: If you have any global styles

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Register Page */}
          <Route path="/register" element={<Register />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Admin Page (Protected Route) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute redirectTo="/login">
                <AdminPage />
              </PrivateRoute>
            }
          />

          {/* Student Page (Protected Route) */}
          <Route
            path="/student"
            element={
              <PrivateRoute redirectTo="/login">
                <StudentPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
