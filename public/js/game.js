(function() {
  const game = {
    serverUrl: 'http://localhost:3000',
    players: 1,
    code: '',
    idPlayer: '',

    render: function() {
      const $players = document.getElementById('players')
      const $code = document.getElementById('code')
      $players.innerHTML = this.players
      $code.innerHTML = this.code
    },

    init: function() {
      this.code = document.getElementById('codeInput').value
      // const socket = io.connect(vm.serverUrl);
      // socket.emit('connect', {
      //   code: vm.code
      // })
      this.render()
    }
  }

  game.init();
})();
