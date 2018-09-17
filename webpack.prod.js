const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /firstscreen\.sass/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              minimize: true
              //url: false //установкой url=false говорим, что все ссылки на файлы в SCSS коде не трогаем, пути не меняем, никакие файлы не копируем и не встраиваем
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /firstscreen\.sass/,
        use: [
          {
            loader: 'style-loader',
            options: {}
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  mode: 'production',
  //https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: 'common',
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  // optimization: {
  //   minimize: false,
  //   runtimeChunk: { name: 'common' },
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /\.jsx?$/,
  //         chunks: 'all',
  //         minChunks: 2,
  //         name: 'common',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new CopyWebpackPlugin([
      {
        from: './src/uploads',
        to: './uploads'
      }
    ])
  ]
});
