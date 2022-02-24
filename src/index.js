// Main index.js file, which starts the whole React render

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Broccoli from './Broccoli';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Broccoli />
  </React.StrictMode>,
  document.getElementById('root')
);

// Helpfull in reporting Web Vitals (not used currently)
reportWebVitals();
