const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  //devtool: 'source-map',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    //contentBase: './dist',
    //overlay: true,
    hot: true,
    port: 55555
  }
});
