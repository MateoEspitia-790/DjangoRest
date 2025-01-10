// src/components/SensorData.jsx
import React, { useEffect, useState } from 'react';

const SensorData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL de la API en Django para obtener los datos del sensor
    const apiUrl = 'https://django-api-sensor-to-db.onrender.com/api/sensor_data/';

    // Hacer una solicitud GET a la API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del sensor');
        }
        return response.json();
      })
      .then(data => {
        setData(data);  // Guardar los datos en el estado
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Ejecuta el efecto una sola vez al montar el componente

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Datos del Sensor</h2>
      <ul>
        {data.map((sensor, index) => (
          <li key={index}>
            <strong>Nombre del Sensor:</strong> {sensor.sensor_name}<br />
            <strong>Valor:</strong> {sensor.value}<br />
            <strong>Fecha:</strong> {new Date(sensor.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorData;
