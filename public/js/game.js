(function() {
  const game = {
    serverUrl: 'http://localhost:3000',
    players: 1,
    code: '',

    init: function() {
      this.code = document.getElementById('code').value;
      const socket = io.connect(this.serverUrl);

      socket.emit('connect', {
        code: this.code
      })
    }
  }

  game.init();
})();
