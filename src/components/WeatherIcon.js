import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { weatherIcons } from '../icons/weatherIcons';

function WeatherIcon({ code }) {
  const icon = weatherIcons[code]; 
  return <FontAwesomeIcon icon={icon} />;
}

export default WeatherIcon;