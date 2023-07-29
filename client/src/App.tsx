import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Items from './Items';
import ItemDetails from './ItemDetails';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LocationSearchInput from './LocationSearchInput'; // New import

function App() {
  useEffect(() => {
    fetch('/test')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log('Error: ', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;