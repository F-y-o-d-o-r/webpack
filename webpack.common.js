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
      chunks: [ 'index', 'common', 'vendors' ]
    }),
    new HtmlWebpackPlugin({
      title: 'Second',
      filename: 'second.html',
      template: './src/secondpage/second.pug',
      chunks: [ 'secondpage', 'common', 'vendors' ]
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
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024,
          // Remove quotes around the encoded URL –
          // they’re rarely useful
          noquotes: true
        }
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, 'src/fonts'),
        use: {
          loader: 'file-loader',
          options: { outputPath: 'fonts/', publicPath: './src/fonts/', name: '[name].[ext]' }
        }
      }
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   include: path.resolve(__dirname, 'src'),
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       //options: { outputPath: 'img/', publicPath: './src/img/', name: '[name].[ext]' }
      //       options: { name: '[name].[ext]' }
      //     }
      //   ]
      // }
    ]
  }
};
