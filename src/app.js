const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')
const bodyParser = require('body-parser')

const gameController = require('./controllers/game-controller')

const app = express()
const server = http.Server(app)
const io = socketIo(server)

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

app.get('/create', gameController.create)

app.get('/game', gameController.show)

io.on('connection', function (socket) {
  socket.on('join', function(data) {
    gameController.game.addPlayer(data.code, data.ip, data.nik)
    const emitData = {
      players: gameController.game.getPlayersFor(data.code),
      totalPlayers: gameController.game.getTotalPlayersFor(data.code)
    }
    socket.emit('joinConfirmation', emitData)
    socket.broadcast.emit('addPlayer', emitData)
    console.log('game', gameController.game)
  })
})

server.listen(3000, function() {
  console.log('Example app listening on port 3000')
})
