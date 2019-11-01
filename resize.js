const fs = require('fs')
const sharp = require('sharp')
var request = require('request');

module.exports = function resize(path, format, width, height) {
//  const readStream = fs.createReadStream(path)
// const readStream = path
var readStream = encodeURI(request(path))
  let transform = sharp()

  if (format) {
    transform = transform.toFormat(format)
  }

  if (width || height) {
    transform = transform.resize(width, height)
  }

  return readStream.pipe(fs.createWriteStream(transform))
}