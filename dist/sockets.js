"use strict";

var _app = require("./app");

_app.io.on('connection', function (socket) {
  socket.on('join', function (data) {
    socket.join(data.code, function () {
      _app.models.game.addPlayer(data.code, data.ip, data.nik);

      var emitData = {
        players: _app.models.game.getPlayersFor(data.code),
        totalPlayers: _app.models.game.getTotalPlayersFor(data.code)
      };

      _app.io.to(data.code).emit('joinConfirmation', emitData);

      socket.broadcast.to(data.code).emit('addPlayer', emitData);
      console.log('game', _app.models.game);
    });
  });
  socket.on('disconnect', function () {// TODO: Fix next method
    // gameController.game.clean()
    // TODO: Leave channel if it is not exists anymore
  });
});