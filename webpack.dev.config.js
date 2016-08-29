const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
        // ,
        // query: {
        //   presets: ['es2015', 'react']
        // }
      }, 
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap"),
        include: path.join(__dirname, 'app', 'sass'),
      }
    ]
  }
};
