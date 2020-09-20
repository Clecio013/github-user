const webpack = require('webpack')
const path = require('path')

const config = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

module.exports = config
