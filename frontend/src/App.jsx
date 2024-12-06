// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SensorData from './components/SensorData';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h1 className="navbar-title">Panel de Sensores</h1>
          <nav className="navbar-links">
            <NavLink to="/" className="nav-link" activeClassName="active-link">
              Datos del Sensor
            </NavLink>
            <NavLink to="/dashboard" className="nav-link" activeClassName="active-link">
              Dashboard
            </NavLink>
            <NavLink to="/configuracion" className="nav-link" activeClassName="active-link">
              Configuración
            </NavLink>
            <NavLink to="/acerca" className="nav-link" activeClassName="active-link">
              Acerca de
            </NavLink>
            <NavLink to="/soporte" className="nav-link" activeClassName="active-link">
              Soporte
            </NavLink>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SensorData />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
