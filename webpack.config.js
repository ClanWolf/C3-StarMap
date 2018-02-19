/* @flow */

const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'), 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
          	presets: [['es2015'/*, { "modules": false }*/], 'stage-0', 'react'],
          	plugins: ['transform-decorators-legacy'],
          	compact: true
          }
        }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    	{
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {   
        test: /\.(png|jpg)/,  
        loader: "file-loader"
      }
    ],
  },
};