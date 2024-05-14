import React, { useState, useEffect } from 'react';
import WeatherTable from './components/WeatherTable';
import MapView from './components/MapView';
import './App.css';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [inputCoordinates, setInputCoordinates] = useState({ lat: '', lng: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL); // Sprawdź, czy zmienna jest poprawnie załadowana
  }, [darkMode]);

  const fetchWeather = () => {
    if (inputCoordinates.lat && inputCoordinates.lng) {
      axios.get(`https://weatherforecast-backend.onrender.com/?latitude=${inputCoordinates.lat}&longitude=${inputCoordinates.lng}`)
        .then(response => setWeatherData(response.data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  };


  useEffect(() => {
    if (inputCoordinates.lat && inputCoordinates.lng) {
      fetchWeather();
    }
  }, [inputCoordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCoordinates()) {
      fetchWeather();
    } else {
      setError('Please enter valid latitude and longitude values.');
    }
  };

  const handleInputChange = (e, type) => {
    const { value } = e.target;
    const numValue = value === '' ? '' : parseFloat(value);
    if (!isNaN(numValue) || value === '') {
      setInputCoordinates(prev => ({
        ...prev,
        [type]: numValue
      }));
    }
  };

  const validateCoordinates = () => {
    return (
      inputCoordinates.lat >= -90 && inputCoordinates.lat <= 90 &&
      inputCoordinates.lng >= -180 && inputCoordinates.lng <= 180
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        Weather Forecast
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      </header>
      <MapView onCoordinatesChange={setInputCoordinates} />
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputCoordinates.lat === '' ? '' : inputCoordinates.lat}
          onChange={e => handleInputChange(e, 'lat')}
          placeholder="Enter latitude"
        />
        <input
          type="number"
          value={inputCoordinates.lng === '' ? '' : inputCoordinates.lng}
          onChange={e => handleInputChange(e, 'lng')}
          placeholder="Enter longitude"
        />
        <button type="submit">Get Weather</button>
      </form>
      <WeatherTable coordinates={inputCoordinates} />
    </div>
  );
}

export default App;
