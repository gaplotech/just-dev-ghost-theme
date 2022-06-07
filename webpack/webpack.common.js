const Path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const webpack = require('webpack')

const ASSET_PATH = Path.join(__dirname, '../assets')

module.exports = {
  entry: {
    'js/color-scheme': './src/js/color-scheme.js',
    'js/main': './src/js/main.js',
    'css/light': './src/scss/light.scss',
    'css/dark': './src/scss/dark.scss',
    'css/gapstyle': './src/scss/shiki/gapstyle.scss'
  },
  output: {
    path: ASSET_PATH,
    publicPath: "/assets/",
  },
  optimization: {
    splitChunks: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new CopyWebpackPlugin([{ from: Path.resolve(__dirname, '../static'), to: '' }]),
    new RemovePlugin({
      // scss entry will produce unnecessary .js file, use this plugin to remove it
      after: {
        test: [
          {
            folder: Path.resolve(__dirname, '../assets/css'),
            method: filePath => new RegExp(/\.js$|\.js.map$/).test(filePath)
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  }
}
