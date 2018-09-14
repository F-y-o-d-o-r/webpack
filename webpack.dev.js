const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
    //stats: 'errors-only',
    //contentBase: './src',
    //overlay: true,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
    port: 55555
  }
});
