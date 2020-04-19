const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')

const Game = require('./models/game')

const app = express()
const server = http.Server(app)
const io = socketIo(server)
let game = null

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  const error = req.query.error
  const code = req.query.code

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

  if (!code || code.trim() === '') {
    return res.redirect('/?error=emptyCode')
  }

  if (!code || code.trim() === '') {
    return res.redirect('/?code=' + code + '&error=invalidCode')
  }

  return res.render('game', {
    code: code
  })
})

io.on('connection', (socket) => {
  socket.on('join', function(data) {
    game.addPlayer(data.code, data.ip)
    const emitData = {
      players: game.playersFor(data.code)
    }
    socket.emit('joinConfirmation', emitData)
    socket.broadcast.emit('addPlayer', emitData)
  })
})

server.listen(3000, function() {
  game = new Game();
  console.log('Example app listening on port 3000')
})
