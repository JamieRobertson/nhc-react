const path = require('path');
const express = require('express');
// const Api = require('./api.js');

// Set the port
const port = process.env.PORT || 8080;

// Configure Express
const app = express();
const staticPath = express.static(path.join(__dirname + "/app/static"));


// Are we in production?
let isDev = process.env.NODE_ENV !== 'production' ? true : false;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files 
app.use('/static', staticPath);

// Serve the API - when finished serve the root with a callback
app.get('/api', function (req, res, next) {
	res.set('Content-Type', 'application/json');
	res.json({ message: 'hooray! welcome to our api!' });
});

// Serve the web app
app.get('/', function (req, res) {
	// Only import css from external file in production
	res.render(path.join(__dirname + '/app/index'), {
		isDev: isDev
	}); 
});


/**
 * if running npm start without production env, we build webpack here (eg if developing).
 * For heroku, use postinstall to build webpack + configure heroku like this:
 * heroku config:set NODE_ENV=production
 * heroku config:set NPM_CONFIG_PRODUCTION=true
 */
if (isDev) {
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const config = require('./webpack.dev.config.js');
	const compiler = webpack(config);

	app.use(webpackHotMiddleware(compiler, {
		log: console.log 
	}));
	app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
		// ,
		// noInfo: false,
		// stats: {colors: true}
	}));
}

// Listen on port 
app.listen(port, function () {
  console.log('App listening at http://localhost:' + port);
});