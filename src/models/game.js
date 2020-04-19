const Party = require('./party')
const Player = require('./player')

class Game {
  constructor () {
    this.parties = []
  }

  clean () {
    const parties = {}
    Object.keys(this.parties).forEach((party) => {
      if (party.players.length > 0) {
        parties[party.code] = party
      }
    })
    this.parties = parties
  }

  addPlayer(code, ip) {
    if (!this.parties.hasOwnProperty(code)) {
      this.parties[code] = new Party(code)
    }

    this.parties[code].players[ip] = new Player(ip)
  }

  playersFor(code) {
    if (!this.parties.hasOwnProperty(code)) {
     return 0;
    }

    return Object.keys(this.parties[code].players).length
  }
}

module.exports = Game
