(function() {
  const game = {
    socket: null,
    serverUrl: 'http://localhost:3000',
    players: 1,
    code: '',
    ip: '',

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
              vm.ip = data.ip
              vm.joinParty()
              console.log('joining')
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

    onJoinConfirm: function(data) {
      this.players = data.players.length
    },

    init: function() {
      this.code = document.getElementById('codeInput').value
      this.render()

      this.socket = io.connect(this.serverUrl)
      this.socket.on('joinConfirm', this.onJoinConfirm)

      this.getIp()
    }
  }

  game.init();

  // TODO: Deletenext after debug
  window.game = game
})();
