const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// In dev styles are loaded inline - ExtractTextPlugin does not work with HMR

// webpack-hot-middleware/client?reload=true is a hack 
// it reloads when ewbpack gets stuck
// https://github.com/glenjamin/webpack-hot-middleware

module.exports = {
	devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    './app/main'
  ],

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
  	new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
      }, 
      { 
        test: /\.sass?$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        include: path.join(__dirname, 'app', 'sass') 
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 3 versions'] }) ]
};
