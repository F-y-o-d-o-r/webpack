let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        loader: 'babel-loader',
        //exclude: '/node_modules/',
        // options: {
        //   presets: [
        //     "env"
        //   ]
        // }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },

    ]
  },
  //devtool: 'eval-sourcemap',
  plugins: [
    new ExtractTextPlugin("css/styles.css"),
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