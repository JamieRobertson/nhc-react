import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import data from './data/data2016.js';
import tiles from './data/mapTilesData.js';
import './sass/app.sass';

ReactDOM.render(<App data={data} tiles={tiles} />, document.getElementById('app'));