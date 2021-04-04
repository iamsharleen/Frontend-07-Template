const webpack = require('webpack'); // 用于访问内置插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
  },
  module: {
    rules: [{ test: /\.vue$/, use: 'vue-loader' }],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/*.html", to: "[name].[ext]" },
      ],
    }),
  ],
};