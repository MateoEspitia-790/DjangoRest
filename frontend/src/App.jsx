import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import SensorData from './components/SensorData';
import Dashboard from './components/Dashboard';
import Predicciones from './components/predicciones';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Barra superior fija */}
        <header className="topbar">
          <h1 className="topbar-title">Prototipo Smart Monitoring</h1>
        </header>

        {/* Barra lateral siempre visible */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <NavLink to="/" className="sidebar-link" activeClassName="active-link">
              <span className="icon">🏠</span>
              <span className="link-text">Inicio</span>
            </NavLink>
            <NavLink to="/estaciones" className="sidebar-link" activeClassName="active-link">
              <span className="icon">🌱</span>
              <span className="link-text">Estaciones</span>
            </NavLink>
            <NavLink to="/predicciones" className="sidebar-link" activeClassName="active-link">
              <span className="icon">🌤️</span>
              <span className="link-text">Predicciones</span>
            </NavLink>
            <NavLink to="/trabajo" className="sidebar-link" activeClassName="active-link">
              <span className="icon">💼</span>
              <span className="link-text">Trabajo</span>
            </NavLink>
            <NavLink to="/extras" className="sidebar-link" activeClassName="active-link">
              <span className="icon">⭐</span>
              <span className="link-text">Extras</span>
            </NavLink>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SensorData />} />
            <Route path="/estaciones" element={<Dashboard />} />
            <Route path="/predicciones" element={<Predicciones />} />
            <Route path="/trabajo" element={<div>Trabajo Cultivo</div>} />
            <Route path="/extras" element={<div>Extras</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
