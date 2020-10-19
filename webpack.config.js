const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  
  return {
  mode: 'development',
  entry: ['babel-polyfill','./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public",  "index.html")
    }),
    new webpack.DefinePlugin(envKeys),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_KEY": JSON.stringify(process.env.REACT_APP_KEY)
    }),
  ]
}
};

// const path = require('path');

// // This is the main configuration object.
// // Here you write different options and tell Webpack what to do
// module.exports = {

//   // Path to your entry point. From this file Webpack will begin his work
//   entry: './src/index.js',

//   // Path and filename of your result bundle.
//   // Webpack will bundle all JavaScript into this file
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },

//   // Default mode for Webpack is production.
//   // Depending on mode Webpack will apply different things
//   // on final bundle. For now we don't need production's JavaScript 
//   // minifying and other thing so let's set mode to development
//   mode: 'development'
// };