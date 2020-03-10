const express = require('express')
const app = express()
var path = require('path')

app.get('/Public/imgbin/image.jpeg', function (request, response) {
  response.sendFile(path.join(__dirname, '/Public/imgbin/image.jpeg'))
})

app.get('/Public/jsbin/geocoding.js', function (request, response) {
  response.type('.js')
  response.sendFile(path.join(__dirname, '/Public/jsbin/geocoding.js'))
})

app.get('/Public/jsbin/SQlite.js', function (request, response) {
  response.type('.js')
  response.sendFile(path.join(__dirname, '/Public/jsbin/SQlite.js'))
})

app.get('/Ear/', function (request, response) {
  console.log(request.query.latlng)
  NewPI(null, request.query.latlng)
  LoadForMap()
  response.send("Hello Raspberry Pi!")
})

app.get('/', function (request, response) {
  response.render('index')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
app.set('view engine', 'ejs')