import React from "react";
import GoogleMapReact from "google-map-react";
import { PlaceData } from './types';

interface AnyReactComponentProps {
  text: string;
  lat: number;
  lng: number;
}
const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => <div>{text}</div>;


interface ItemType {
  id: string;
  name: string;
  description: string;
  protocol: string;
  image: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface Place {
  id: string;
  name: string;
  location: Location;
}

interface MapProps {
  item: ItemType; // your item type here
  center: Location;
  zoom: number;
  places: Place[];
}

const Map: React.FC<MapProps> = ({ center, zoom, places }) => {

  if (!places || places.length === 0) return <p>No locations found.</p> 

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string }} defaultCenter={center} defaultZoom={zoom}>
        {/* Display places on this map */}
        {places.map(place =>
          <AnyReactComponent
            key={place.id}
            lat={place.location.lat}
            lng={place.location.lng}
            text={place.name}
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

export default Map;