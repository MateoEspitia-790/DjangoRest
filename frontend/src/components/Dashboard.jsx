// src/components/Dashboard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const Dashboard = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  // Estado para almacenar los datos del gráfico y actualizar el componente
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Crear el gráfico y la serie solo una vez
    if (!chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#e0e0e0' },
          horzLines: { color: '#e0e0e0' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: '#e0e0e0',
        },
        timeScale: {
          borderColor: '#e0e0e0',
        },
      });

      seriesRef.current = chartRef.current.addLineSeries({
        color: '#2e7d32',
        lineWidth: 2,
      });
    }

    // Función para cargar datos iniciales
    const loadData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sensor_data/');
        const data = await response.json();
        const formattedData = data.map((item) => ({
          time: new Date(item.timestamp).getTime() / 1000,
          value: item.value,
        }));

        // Establecer los datos iniciales en el gráfico y actualizar el estado
        seriesRef.current.setData(formattedData);
        setChartData(formattedData);
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
        
        const newData = {
          time: new Date(latestData.timestamp).getTime() / 1000,
          value: latestData.value,
        };

        // Actualizar el gráfico y el estado para forzar el re-renderizado
        seriesRef.current.update(newData);
        setChartData((prevData) => [...prevData, newData]);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }, 5000);

    return () => clearInterval(intervalId);  // Limpiar el intervalo al desmontar el componente
  }, []);

  return (
    <div>
      <h2>Dashboard de Sensores en Tiempo Real</h2>
      <div
        ref={chartContainerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          height: '400px',
          margin: '0 auto',
        }}
      />
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
