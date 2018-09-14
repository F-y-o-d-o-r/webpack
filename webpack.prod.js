const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
      }
    ]
  },
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [ new CleanWebpackPlugin([ 'dist' ]) ]
});
