const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    polyfills: './src/polyfills.js',
    app: './src/index.js'
    //other: './src/other.js'
    //'vendor': [
    //  'jquery',
    //  'popper.js',
    //  'bootstrap',
    //],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'Production',
      // inject: false,
      // hash: true,
      template: './src/index.pug'
      // filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      // title: 'Production',
      // inject: false,
      // hash: true,
      filename: 'second.html',
      template: './src/second.pug'
      // filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/[name][hash].css' : '[name].css',
      chunkFilename: devMode ? 'css/[id][hash].css' : '[id].css'
    })
  ],
  output: {
    filename: 'js/[name].[hash].js',
    //filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.pug/,
        loaders: [ 'html-loader', 'pug-html-loader' ]
      }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   include: path.resolve(__dirname, 'src'),
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: { outputPath: 'img/', publicPath: './src/img/', name: '[name].[ext]' }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   include: path.resolve(__dirname, 'src'),
      //   use: {
      //     loader: 'file-loader',
      //     options: { outputPath: 'fonts/', publicPath: './src/fonts/', name: '[name].[ext]' }
      //   }
      // }
    ]
  }
};
