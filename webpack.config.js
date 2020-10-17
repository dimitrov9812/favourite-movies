const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
    })
  ]
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