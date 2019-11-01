const express = require('express')
const resize = require('./resize')
const bodyParser = require('body-parser')
const server = express()

server.use(bodyParser.urlencoded( {extended:true }))

server.set('view engine', 'pug')

server.get('/', (req, res) => {
    res.render('index')
})


server.post('/submit', (req, res) => {
    imageurl = JSON.stringify(req.body.imageurl)
    encodedurl = decodeURI(imageurl)
    res.redirect('http://localhost:8000/api?format=png&width=120&height=24')
});

server.get('/api', (req, res) => {
  // Extract the query-parameter
  const widthString = req.query.width
  const heightString = req.query.height
  const format = req.query.format

  // Parse to integer if possible
  let width, height
  if (widthString) {
    width = parseInt(widthString)
  }
  if (heightString) {
    height = parseInt(heightString)
  }
  // Set the content-type of the response
  res.type(`image/${format || 'png'}`)

  // Get the resized image
  resize(encodedurl, format, width, height).pipe(res)
})



//API Command
//http://localhost:8000?format=png&width=200&height=200
server.listen(8000, () => {
  console.log('Server started!')
})