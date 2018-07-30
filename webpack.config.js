let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
//let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //куда
    filename: 'main.js',
    publicPath: 'dist/', //сюда пойдут стили, картинки и тд
  },
  devServer: {
    overlay: true,
    port: 55555
  },
  module: {
    rules: [{
        test: /\.js$/,
        //loader: 'babel-loader',
        exclude: '/node_modules/',
        // options: {
        //   presets: [
        //     "env"
        //   ]
        // },
        use: {
          loader: "babel-loader"
        }
      },
      //просто css
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: ["css-loader"]
      //   })
      // },
      //sass
      // {
      //   test: /\.sass$/,
      //   use: ExtractTextPlugin.extract(
      //     {
      //       fallback: 'style-loader',
      //       use: ['css-loader', 'sass-loader']
      //     })
      // },
      //вместе с cssnano, autoprefixer
      // {
      //   test: /\.sass$/,
      //   use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      // },.
      {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        },
    ]
  },
  //devtool: 'eval-sourcemap',
  plugins: [
    new ExtractTextPlugin("css/styles.css"),
    // new MiniCssExtractPlugin({
    //   filename: 'css/styles.css',
    // }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
};

module.exports = (event, options) => {
  let production = options.mode === 'production';

  conf.devtool = production
    //? 'source-map'
    ?
    false :
    'eval-sourcemap';

  return conf;
}