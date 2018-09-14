let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  //mode: 'development',
  //mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'img/', publicPath: './src/img/', name: '[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: { outputPath: 'fonts/', publicPath: './src/fonts/', name: '[name].[ext]' }
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    //contentBase: './dist',
    //overlay: true,
    hot: true,
    port: 55555
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new HtmlWebpackPlugin(
      {
        //title: 'Output Management',
        // inject: false,
        // hash: true,
        // template: './src/index.html',
        // filename: 'index.html'
      }
    ),
    new webpack.HotModuleReplacementPlugin()
  ]
};
