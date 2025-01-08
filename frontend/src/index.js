import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ensure this path matches the location of your App component
import './index.css'; // Optional, if you have global CSS styles

// Create the root React element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
