var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/jsx/app.jsx',  './src/css/custom.css', './src/css/main.scss',],
  output: {
    path: __dirname + '/public/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader']
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css-loader']),
      },
      { 
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ 
      filename: '../css/bundle.css',
      allChunks: true,
    })
  ]
}