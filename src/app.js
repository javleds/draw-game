const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')

const app = express()
const server = http.Server(app)
const io = socketIo(server)

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/create', function(req, res) {
  const randomCode = Math.random().toString(36).substring(2, 7);
  res.redirect('/game?' + randomCode)
})

io.on('connect', function() {
  console.log('Hello world from socket.io')
})

server.listen(3000, function() {
  console.log('Example app listening on port 3000')
})
