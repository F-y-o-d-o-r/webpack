const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
//https://bitwiser.in/2018/02/22/setup-javascript-webpack-project.html
//const isDev = env === 'development';
//const env = process.env.NODE_ENV || 'development';
//"build": "NODE_ENV=production webpack"
//new ExtractTextPlugin({filename: 'index.css',disable: isDev});

module.exports = {
  entry: {
    //polyfills: './src/polyfills.js',
    //app: './src/index.js',
    //second: './src/second.js'
    index: './src/pages/index/forindex.js',
    secondpage: './src/pages/secondpage/forsecondpage.js'
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      template: './src/pages/index/index.pug',
      filename: 'index.html',
      chunks: [ 'index', 'common', 'vendors' ]
    }),
    new HtmlWebpackPlugin({
      title: 'Second',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      filename: 'second.html',
      template: './src/pages/secondpage/second.pug',
      chunks: [ 'secondpage', 'common', 'vendors' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].[hash].css' : '[name].css',
      chunkFilename: devMode ? 'css/[id].[hash].css' : '[id].css'
    })
  ],
  output: {
    //filename: 'js/[name].[hash].js',
    filename: 'js/[name].[hash].js',
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
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader'
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'babel-loader'
      // },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true
            }
          }
        ]
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
