(function() {

  const gameStatus = {
    inLobby: 'inLobby',
    drawing: 'drawing',
    writing: 'writing',
    finished: 'finished',
  }

  const game = {
    socket: null,
    serverUrl: 'http://localhost:3000',
    totalPlayers: 1,
    players: {},
    code: '',
    ip: '',
    nik: '',
    connected: false,
    status: gameStatus.inLobby,

    render: function() {
      const $loader = document.getElementById('loader')
      const $totalPlayers = document.getElementById('totalPlayers')
      const $players = document.getElementById('players')
      const $code = document.getElementById('code')
      const $game = document.getElementById('game')

      if ($loader && this.connected) {
        $loader.remove()
      }

      const playerNames = []
      for (let i in this.players) {
        playerNames.push(this.players[i].nik)
      }

      $players.innerHTML = '&nbsp;(' + playerNames.join(', ') + ')'
      $totalPlayers.innerHTML = this.totalPlayers
      $code.innerHTML = this.code

      this._hideAllGameChildren($game)
      let activeChildrenIndex = 0
      switch (this.status) {
        case gameStatus.inLobby:
          activeChildrenIndex = 0
          break;
        case gameStatus.drawing:
          activeChildrenIndex = 1
          break;
        case gameStatus.writing:
          activeChildrenIndex = 2
          break;
        case gameStatus.finished:
          activeChildrenIndex = 3
          break;
      }

      $game.children[activeChildrenIndex].classList = 'active'
    },

    _hideAllGameChildren: function($game) {
      for (let i = 0; i < $game.children.length; i++) {
        const child = $game.children[i]
        child.classList = ''
      }
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
