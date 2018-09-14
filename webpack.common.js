const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    //polyfills: './src/polyfills.js',
    //app: './src/index.js',
    //second: './src/second.js'
    index: './src/index/forindex.js',
    secondpage: './src/secondpage/forsecondpage.js'
    //'vendor': [
    //  'jquery',
    //  'popper.js',
    //  'bootstrap',
    //],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Index',
      // inject: false,
      // hash: true,
      template: './src/index/index.pug',
      filename: 'index.html',
      chunks: [ 'index' ]
    }),
    new HtmlWebpackPlugin({
      title: 'Second',
      filename: 'second.html',
      template: './src/secondpage/second.pug',
      chunks: [ 'secondpage' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name][hash].css' : '[name].css',
      chunkFilename: devMode ? 'css/[id][hash].css' : '[id].css'
    })
  ],
  output: {
    //filename: 'js/[name].[hash].js',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }

      // {
      //   test: /\.pug/,
      //   loaders: [ 'html-loader', 'pug-html-loader' ]
      // }
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
