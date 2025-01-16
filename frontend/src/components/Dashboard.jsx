import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/sensor_data/");
        const data = await response.json();

        const humidity = data
          .filter((item) => item.sensor_id === "hum_1")
          .map((item) => ({
            time: new Date(item.timestamp).toLocaleTimeString(),
            humidity: item.value,
          }));

        const temperature = data
          .filter((item) => item.sensor_id === "temp_int")
          .map((item) => ({
            time: new Date(item.timestamp).toLocaleTimeString(),
            temperature: item.value,
          }));

        setHumidityData(humidity);
        setTemperatureData(temperature);

        const combined = data.map((item) => ({
          time: new Date(item.timestamp).toLocaleTimeString(),
          humidity: item.sensor_id === "hum_1" ? item.value : null,
          temperature: item.sensor_id === "temp_int" ? item.value : null,
        }));

        setCombinedData(combined);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    loadData();

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/sensor_data/");
        const data = await response.json();
        const latestData = data[data.length - 1];

        if (
          latestData.sensor_id === "hum_1" &&
          (humidityData.length === 0 ||
            latestData.timestamp !==
              humidityData[humidityData.length - 1]?.timestamp)
        ) {
          const newHumidity = {
            time: new Date(latestData.timestamp).toLocaleTimeString(),
            humidity: latestData.value,
          };
          setHumidityData((prev) => [...prev, newHumidity]);
        }

        if (
          latestData.sensor_id === "temp_int" &&
          (temperatureData.length === 0 ||
            latestData.timestamp !==
              temperatureData[temperatureData.length - 1]?.timestamp)
        ) {
          const newTemperature = {
            time: new Date(latestData.timestamp).toLocaleTimeString(),
            temperature: latestData.value,
          };
          setTemperatureData((prev) => [...prev, newTemperature]);
        }

        const newCombined = {
          time: new Date(latestData.timestamp).toLocaleTimeString(),
          humidity:
            latestData.sensor_id === "hum_1" ? latestData.value : null,
          temperature:
            latestData.sensor_id === "temp_int" ? latestData.value : null,
        };

        setCombinedData((prev) => [...prev, newCombined]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [humidityData, temperatureData]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard de Sensores en Tiempo Real</h2>

      <div className="graph-container">
        {/* Gráfico combinado */}
        <div className="graph combined-graph">
          <h3>Gráfico Combinado: Humedad y Temperatura</h3>
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={combinedData}>
      <defs>
        {/* Gradiente para Humedad */}
        <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#1e88e5" stopOpacity={0} />
        </linearGradient>
        {/* Gradiente para Temperatura */}
        <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      {/* Área de Humedad */}
      <Area
        type="monotone"
        dataKey="humidity"
        stroke="#1e88e5"
        fill="url(#colorHumidity)"
        name="Humedad"
      />
      {/* Área de Temperatura */}
      <Area
        type="monotone"
        dataKey="temperature"
        stroke="#d32f2f"
        fill="url(#colorTemperature)"
        name="Temperatura"
      />
    </AreaChart>
  </ResponsiveContainer>
        </div>

        {/* Gráfico de Humedad */}
        <div className="graph">
          <h3>Humedad</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={humidityData}>
              <defs>
                <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1e88e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="humidity"
                stroke="#1e88e5"
                fillOpacity={1}
                fill="url(#colorHumidity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Temperatura */}
        <div className="graph">
          <h3>Temperatura</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={temperatureData}>
              <defs>
                <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#d32f2f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#d32f2f"
                fillOpacity={1}
                fill="url(#colorTemperature)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
