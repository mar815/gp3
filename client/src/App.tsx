import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Items from './Items';
import ItemDetails from './ItemDetails';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LocationSearchInput from './LocationSearchInput';
import { LocationProvider, useLocation } from './LocationContext';

function App() {

  const { setUserLocation } = useLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
        (error) => {
          console.warn('Geolocation permission denied.', error);
          // Set to a default location (can be updated to a more acceptable default).
          setUserLocation({ lat: 35.6895, lng: 139.6917 });
        });
    } else {
      console.warn("Geolocation is not supported by this browser.");
      setUserLocation({ lat: 35.6895, lng: 139.6917 });
    }
  }, [setUserLocation]);


  useEffect(() => {
    fetch('/test')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log('Error: ', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>

      <LocationProvider>
        <div className="App">

          <Router>
            <Typography variant="h4" className="App-header" component="span" sx={{ color: '#086972' }}>
              Green Planet
            </Typography>
            <LocationSearchInput /> {/* New component for location input */}
            <Routes>
              <Route path="/items/:id" element={<ItemDetails item={null} onClose={() => { }} />} />
              <Route path="/" element={<Items />} />
            </Routes>
          </Router>

        </div>
      </LocationProvider>
    </ThemeProvider>

  );
}

export default App;