const Path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const glob = require('glob')

module.exports = {
  entry: {
    'js/prism': './src/js/prismjs/prism.js',
    'js/app': Path.resolve(__dirname, '../src/js/app.js'),
    'css/app': Path.resolve(__dirname, '../src/scss/screen.scss'),
    'css/dark': Path.resolve(__dirname, '../src/scss/dark.scss'),
    'css/gapstyle': Path.resolve(__dirname, '../src/scss/gapstyle.scss'),
    ...glob.sync('./src/js/pages/*.js').reduce((acc, curr) => {
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
  plugins: [new CopyWebpackPlugin([{ from: Path.resolve(__dirname, '../static'), to: '' }])],
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
