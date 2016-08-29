import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import data from './data/data.js';
import './sass/app.sass';

ReactDOM.render(<App data={data} />, document.getElementById('app'));