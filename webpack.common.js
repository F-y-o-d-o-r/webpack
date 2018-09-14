const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    app: './src/index.js',
    other: './src/other.js'
  },
  plugins: [
    //new CleanWebpackPlugin([ 'dist' ]),
    new HtmlWebpackPlugin(
      {
        // title: 'Production',
        // inject: false,
        // hash: true,
        // template: './src/index.html',
        // filename: 'index.html'
      }
    ),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].[hash].js',
    //filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
  }
};
