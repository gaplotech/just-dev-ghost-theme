const { src, dest } = require('gulp')
const pump = require('pump')

// gulp plugins and utils
const zip = require('gulp-zip')
const beeper = require('beeper')

const handleError = done => {
  return function(err) {
    if (err) {
      beeper()
    }
    return done(err)
  }
}

function zipper(done) {
  const targetDir = 'dist/'
  const themeName = require('./package.json').name
  const filename = themeName + '.zip'

  pump(
    [
      src([
        '**',
        '!.git',
        '!.git/**',
        '!node_modules',
        '!node_modules/**',
        '!dist',
        '!dist/**',
        '!docker-cache',
        '!docker-cache/**',
        '!secret.json',
        '!**/*.map'
      ]),
      zip(filename),
      dest(targetDir)
    ],
    handleError(done)
  )
}

exports.zip = zipper
