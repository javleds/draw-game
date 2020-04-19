const Party = require('./party')
const Player = require('./player')

class Game {
  constructor () {
    this.parties = []
  }

  clean () {
    const vm = this
    const parties = {}

    for (let i in vm.parties) {
      const party = vm.parties[i]
      if (this.getTotalPlayersFor(party.code) > 0) {
        parties[party.code] = party
      }
    }

    this.parties = parties
  }

  addPlayer(code, ip, nik) {
    if (!this.parties.hasOwnProperty(code)) {
      this.parties[code] = new Party(code)
    }

    this.parties[code].players[ip] = new Player(ip, nik)
  }

  getTotalPlayersFor(code) {
    if (!this.parties.hasOwnProperty(code)) {
     return 0;
    }

    return Object.keys(this.parties[code].players).length
  }

  getPlayersFor(code) {
    if (!this.parties.hasOwnProperty(code)) {
      return {};
    }

    return this.parties[code].players
  }
}

module.exports = Game
