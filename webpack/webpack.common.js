const Path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const RemovePlugin = require('remove-files-webpack-plugin')

module.exports = {
  entry: {
    'js/prism': Path.resolve(__dirname, '../src/js/prismjs/prism.js'),
    'js/app': Path.resolve(__dirname, '../src/js/app.js'),
    'css/app': Path.resolve(__dirname, '../src/scss/screen.scss'),
    'css/dark': Path.resolve(__dirname, '../src/scss/dark.scss'),
    'css/gapstyle': Path.resolve(__dirname, '../src/scss/gapstyle.scss'),
    ...glob.sync(Path.resolve(__dirname, '../src/js/pages/*.js')).reduce((acc, curr) => {
      const [head] = curr.replace('./src/', '').split('.')
      acc[head] = curr
      return acc
    }, {})
  },
  output: {
    path: Path.join(__dirname, '../assets')
  },
  optimization: {
    splitChunks: false
  },
  plugins: [
    new CopyWebpackPlugin([{ from: Path.resolve(__dirname, '../static'), to: '' }]),
    new RemovePlugin({
      // scss entry will produce unnecessary .js file, use this plugin to remove it
      after: {
        test: [
          {
            folder: Path.resolve(__dirname, '../assets/css'),
            method: filePath => new RegExp(/\.js$/).test(filePath)
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
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
