import React, { useEffect, useState } from 'react';

const Predicciones = () => {
  const [realtimeWeather, setRealtimeWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'IX8T2kY18YDc6Ct7CzHMYQRxMRIeumbU';
  const location = { lat: 7.5776, lon: -72.4757 }; // Coordenadas de Ragonvalia, Norte de Santander, Colombia
  const mapLayer = 'precipitation'; // Tipo de capa del mapa

  useEffect(() => {
    // Obtener datos de tiempo real
    const fetchRealtimeWeather = async () => {
      try {
        const response = await fetch(
          `https://api.tomorrow.io/v4/timelines?location=${location.lat},${location.lon}&fields=temperature,humidity,precipitationIntensity&units=metric&timesteps=current&apikey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los datos del clima');
        }
        const data = await response.json();
        setRealtimeWeather(data.data.timelines[0].intervals[0].values);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRealtimeWeather();
  }, []);

  // Actualiza la URL del mapa para usar las coordenadas y capa definidas
  const mapUrl = `https://api.tomorrow.io/v4/map/tile/${mapLayer}/current/8/0/0/256.png?apikey=${apiKey}&location=${location.lat},${location.lon}`;

  return (
    <div>
      <h2>Predicciones del Clima</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Clima en tiempo real */}
        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h3>Clima en Tiempo Real</h3>
          {error ? (
            <p>Error: {error}</p>
          ) : realtimeWeather ? (
            <div>
              <p>Temperatura: {realtimeWeather.temperature} °C</p>
              <p>Humedad: {realtimeWeather.humidity} %</p>
              <p>Intensidad de Precipitación: {realtimeWeather.precipitationIntensity} mm/h</p>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>

        {/* Mapa meteorológico */}
        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h3>Mapa Meteorológico</h3>
          <img
            src={mapUrl}
            alt="Mapa Meteorológico"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Predicciones;
