(function() {
  const game = {
    socket: null,
    serverUrl: 'http://localhost:3000',
    totalPlayers: 1,
    players: {},
    code: '',
    ip: '',
    nik: '',
    connected: 0,

    render: function() {
      const $loader = document.getElementById('loader')
      const $totalPlayers = document.getElementById('totalPlayers')
      const $players = document.getElementById('players')
      const $code = document.getElementById('code')

      if ($loader && this.connected === 1) {
        $loader.remove()
      }

      const playerNames = []
      for (let i in this.players) {
        playerNames.push(this.players[i].nik)
      }

      $players.innerHTML = '&nbsp;(' + playerNames.join(', ') + ')'
      $totalPlayers.innerHTML = this.totalPlayers
      $code.innerHTML = this.code
    },

    getIp: function() {
      const vm = this

      fetch('https://api.ipify.org?format=json')
        .then(function(response) {
          response.json()
            .then(function(data) {
              // TODO: Delete (+ new Date().getTime()) before deploy
              vm.ip = data.ip + new Date().getTime()
              vm.joinParty()
            })
            .catch(function(error) {
              console.log('Failed to convert ipRequest into JSON', error)
            })
        })
        .catch(function(error) {
          console.log('Failed to convert ipRequest into JSON', error)
        })
    },

    joinParty: function() {
      this.socket.emit('join', {
        ip: this.ip,
        code: this.code,
        nik: this.nik,
      })
    },

    onAddPlayer: function(data) {
      this.connected = 1
      this.totalPlayers = data.totalPlayers
      this.players = data.players
      this.render()
    },

    init: function() {
      this.code = document.getElementById('codeInput').value
      this.nik = document.getElementById('nikInput').value
      this.render()

      this.socket = io.connect(this.serverUrl)
      this.socket.on('joinConfirmation', this.onAddPlayer.bind(this))
      this.socket.on('addPlayer', this.onAddPlayer.bind(this))

      this.getIp()
    }
  }

  game.init();

  // TODO: Delete next line before deploy
  window.game = game
})();
