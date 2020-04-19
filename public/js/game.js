(function() {
  const game = {
    socket: null,
    serverUrl: 'http://localhost:3000',
    players: 1,
    code: '',
    ip: '',
    connected: 0,

    render: function() {
      const $loader = document.getElementById('loader')
      const $players = document.getElementById('players')
      const $code = document.getElementById('code')

      if ($loader) {
        $loader.remove()
      }

      $players.innerHTML = this.players
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
      })
    },

    onAddPlayer: function(data) {
      this.connected = 1
      this.players = data.players
      this.render()
    },

    init: function() {
      this.code = document.getElementById('codeInput').value
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
