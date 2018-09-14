const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     // Options similar to the same options in webpackOptions.output
  //     // both options are optional
  //     filename: 'css/style.css'
  //   })
  // ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
      }
    ]
  },
  mode: 'development',
  //devtool: 'source-map',
  devtool: 'inline-source-map',
  devServer: {
    //contentBase: './src',
    //overlay: true,
    contentBase: 'src',
    watchContentBase: true,
    hot: true,
    port: 55555
  }
});
