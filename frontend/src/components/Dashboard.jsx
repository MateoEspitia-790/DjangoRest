import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Función para cargar datos iniciales
    const loadData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sensor_data/');
        const data = await response.json();
        const formattedData = data.map((item) => ({
          time: new Date(item.timestamp).toLocaleTimeString(), // Formatear como hora legible
          value: item.value,
        }));

        setChartData(formattedData); // Establecer datos iniciales
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    loadData();

    // Configurar la actualización automática cada 5 segundos
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sensor_data/');
        const data = await response.json();
        const latestData = data[data.length - 1];

        // Verificar si hay una nueva entrada comparando con el último dato del estado
        if (
          chartData.length === 0 || 
          latestData.timestamp !== chartData[chartData.length - 1].timestamp
        ) {
          const newData = {
            time: new Date(latestData.timestamp).toLocaleTimeString(),
            value: latestData.value,
          };

          // Actualizar el estado con el nuevo dato
          setChartData((prevData) => [...prevData, newData]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }, 5000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, [chartData]); // Dependencia para usar el estado más reciente

  return (
    <div>
      <h2>Dashboard de Sensores en Tiempo Real</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2e7d32"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div>
        <h3>Últimos datos del sensor:</h3>
        {chartData.length > 0 && (
          <p>Valor más reciente: {chartData[chartData.length - 1].value}</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
