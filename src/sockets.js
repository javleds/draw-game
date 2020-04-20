import { io, models } from './app'

io.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.code, () => {
      models.game.addPlayer(data.code, data.ip, data.nik)
      const emitData = {
        players: models.game.getPlayersFor(data.code),
        totalPlayers: models.game.getTotalPlayersFor(data.code)
      }
      io.to(data.code).emit('joinConfirmation', emitData)
      socket.broadcast.to(data.code).emit('addPlayer', emitData)
      console.log('game', models.game)
    })
  })

  socket.on('disconnect', () => {
    // TODO: Fix next method
    // gameController.game.clean()
    // TODO: Leave channel if it is not exists anymore
  })
})
