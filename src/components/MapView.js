import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });
  return null;
}

function MapView({ onCoordinatesChange }) {
  const [position, setPosition] = useState({ lat: 52.52, lng: 13.41 });

  const handleManualInput = (e, type) => {
    const { value } = e.target;
    // Sprawdzamy, czy wartość jest pustym stringiem lub czy jest liczbą
    if (!value || isNaN(value)) return;
    setPosition(prev => ({
      ...prev,
      [type]: parseFloat(value)
    }));
  };

  // Propagate the position change to the parent component
  useEffect(() => {
    if (position.lat && position.lng) {
      onCoordinatesChange(position);
    }
  }, [position, onCoordinatesChange]);

  return (
    <div>
      
      <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker setPosition={setPosition} />
        <Marker position={[position.lat, position.lng]} />
      </MapContainer>
    </div>
  );
}

export default MapView;
