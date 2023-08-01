import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { LocationProvider } from './LocationContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LocationProvider>
  <React.StrictMode>
    <App />
    </React.StrictMode>
  </LocationProvider>
);


