import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from './app.component';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
  () => {
    console.log('callback')
  }
);
