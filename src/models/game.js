const Party = require('./party')
const Player = require('./player')

class Game {
  constructor () {
    this.parties = []
  }

  clean () {
    const vm = this
    const parties = {}
    Object.keys(vm.parties).forEach((party) => {
      if (vm.playersFor(party.code) > 0) {
        parties[party.code] = party
      }
    })
    this.parties = parties
  }

  addPlayer(code, ip, nik) {
    if (!this.parties.hasOwnProperty(code)) {
      this.parties[code] = new Party(code)
    }

    this.parties[code].players[ip] = new Player(ip, nik)
  }

  playersFor(code) {
    if (!this.parties.hasOwnProperty(code)) {
     return 0;
    }

    return Object.keys(this.parties[code].players).length
  }
}

module.exports = Game
