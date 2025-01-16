import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Predicciones = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '0dd338274365787f863893853205ec66'; // API Key de OpenWeatherMap
  const ragonvaliaCoords = [7.5776, -72.4757]; // Coordenadas de Ragonvalia, Norte de Santander

  useEffect(() => {
    // Obtener datos de clima desde OpenWeatherMap
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${ragonvaliaCoords[0]}&lon=${ragonvaliaCoords[1]}&units=metric&appid=${apiKey}&lang=es`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los datos del clima');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <h2>Dashboard Meteorológico</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Sección de datos del clima */}
        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h3>Clima en Tiempo Real</h3>
          {error ? (
            <p>Error: {error}</p>
          ) : weatherData ? (
            <div>
              <p>Ciudad: {weatherData.name}</p>
              <p>Temperatura: {weatherData.main.temp} °C</p>
              <p>Humedad: {weatherData.main.humidity} %</p>
              <p>Clima: {weatherData.weather[0].description}</p> {/* Aquí ya estará en español */}
              <p>Viento: {weatherData.wind.speed} m/s</p>
              <p>Presión Atmosférica: {weatherData.main.pressure} hPa</p>
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>

        {/* Sección del mapa meteorológico */}
        <div style={{ flex: '1', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
          <h3>Mapa Meteorológico</h3>
          <MapContainer
            center={ragonvaliaCoords}
            zoom={10} // Nivel de zoom para centrar en Ragonvalia
            style={{ height: '400px', width: '100%' }}
          >
            <LayersControl position="topright">
              {/* Capa base de OpenStreetMap (Carreteras) */}
              <LayersControl.BaseLayer checked name="Carreteras">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
              </LayersControl.BaseLayer>

              {/* Capa de temperatura */}
              <LayersControl.Overlay name="Temperatura">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a> contributors"
                />
              </LayersControl.Overlay>

              {/* Capa de precipitaciones */}
              <LayersControl.Overlay name="Precipitación">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a> contributors"
                />
              </LayersControl.Overlay>

              {/* Capa de presión atmosférica */}
              <LayersControl.Overlay name="Presión Atmosférica">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                  attribution="&copy; <a href='https://openweathermap.org/'>OpenWeatherMap</a> contributors"
                />
              </LayersControl.Overlay>
            </LayersControl>

            {/* Marcador para Ragonvalia */}
            <Marker position={ragonvaliaCoords}>
              <Popup>
                <strong>Ragonvalia</strong>
                <br />
                Norte de Santander, Colombia
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Predicciones;
