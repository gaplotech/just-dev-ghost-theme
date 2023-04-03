const Path = require('path')
const Webpack = require('webpack')
const { merge } = require('webpack-merge')
const WriteFilePlugin = require('write-file-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    host: '0.0.0.0',
    watchContentBase: true,
    proxy: [
      {
        path: '/',
        target: 'http://localhost:2368'
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WriteFilePlugin(),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: ['vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader?sourceMap=true', 'sass-loader']
      }
    ]
  }
})
