"use strict";

var express = require('express');

var http = require('http');

var socketIo = require('socket.io');

var path = require('path');

var bodyParser = require('body-parser');

var homeController = require('./controllers/home-controller');

var gameController = require('./controllers/game-controller');

var app = express();
var server = http.Server(app);
var io = socketIo(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.get('/', homeController.index);
app.get('/create', gameController.create);
app.get('/game', gameController.show);
io.on('connection', function (socket) {
  socket.on('join', function (data) {
    socket.join(data.code, function () {
      gameController.game.addPlayer(data.code, data.ip, data.nik);
      var emitData = {
        players: gameController.game.getPlayersFor(data.code),
        totalPlayers: gameController.game.getTotalPlayersFor(data.code)
      };
      io.to(data.code).emit('joinConfirmation', emitData);
      socket.broadcast.to(data.code).emit('addPlayer', emitData);
      console.log('game', gameController.game);
    });
  });
  socket.on('disconnect', function () {// TODO: Fix next method
    // gameController.game.clean()
    // TODO: Leave channel if it is not exists anymore
  });
});
server.listen(3000, function () {
  console.log('Example app listening on port 3000');
});