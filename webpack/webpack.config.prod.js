const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const common = require('./webpack.common.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  stats: 'errors-only',
  bail: true,
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new MinifyPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
})
