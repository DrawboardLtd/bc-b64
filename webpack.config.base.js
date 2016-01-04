"use strict";

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },

  output: {
    library: 'Db64',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js']
  }
};
