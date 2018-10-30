import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import './style/index.scss';

ReactDOM.render(
  <div className="background">
    <App/>
  </div>,
  document.getElementById('app')
);

module.hot.accept();
