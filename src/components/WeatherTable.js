import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';

function WeatherTable({ coordinates }) {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = () => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/?latitude=${coordinates.lat}&longitude=${coordinates.lng}`)
        .then(response => setWeatherData(response.data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [coordinates]); // Re-fetch whenever coordinates change

  if (!coordinates) {
    return <p>Loading coordinates...</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather Icon</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>Estimated Energy (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((day, index) => (
            <tr key={index}>
              <td>{day.date}</td>
              <td><WeatherIcon code={day.weatherCode.toString()} /></td>
              <td>{day.tempMax}</td>
              <td>{day.tempMin}</td>
              <td>{day.estimatedEnergy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherTable;
