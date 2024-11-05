// src/App.jsx
import React from 'react';
import SensorData from './components/SensorData';
import './App.css'

function App() {
  return (
    <>
     <div className="App">
      <header>
        <h1>Panel de Datos del Sensor</h1>
      </header>
      <main>
        <SensorData />
      </main>
    </div>
    </>
  )
}

export default App
