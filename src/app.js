const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const server = http.Server(app)
const io = socketIo(server)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  const error = req.body.error
  const code = req.body.code

  res.render('index', {
    error: error,
    code: code,
  })
})

app.get('/create', function(req, res) {
  const randomCode = Math.random().toString(36).substring(2, 7);
  res.redirect('/game?code=' + randomCode)
})

app.get('/game', function(req, res) {
  const code = req.query.code

  if (!code || code.length !== 5) {
    return res.redirect('/?code=' + code + '&error=invalidCode')
  }

  return res.render('game', {
    code: code
  })
})

io.on('connect', function() {
  console.log('Hello world from socket.io')
})

server.listen(3000, function() {
  console.log('Example app listening on port 3000')
})
