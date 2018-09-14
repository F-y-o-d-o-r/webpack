let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let WebpackMd5Hash = require('webpack-md5-hash');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //куда
    //filename: '[name].[chunkhash].js',
    filename: 'js/[name].[hash].js'
    //publicPath: 'dist/', //сюда пойдут стили, картинки и тд
  },
  devServer: {
    overlay: true,
    port: 55555,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.sass$/,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ]
};

module.exports = (event, options) => {
  let production = options.mode === 'production';

  conf.devtool = production
    ? //? 'source-map'
      false
    : 'eval-sourcemap';

  return conf;
};
