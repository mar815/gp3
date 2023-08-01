import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface MapProps {
  locations: any[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  const defaultPosition = [37.7749, -122.4194];  // Example: San Francisco. Adjust accordingly or get the user's location.

  return (
    <MapContainer center={defaultPosition} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            {location.name}<br />
            {location.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
