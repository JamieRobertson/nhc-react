const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
// only use Extract text plugin in production
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',

	entry: [
		'./app/main'
  ],

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: '/'
  },

	plugins: [
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
      }, 
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader?sourceMap"),
        include: path.join(__dirname, 'app', 'sass')
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 3 versions'] }) ]
};