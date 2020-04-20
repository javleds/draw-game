"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Party = require('./party');

var Player = require('./player');

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.parties = [];
  }

  _createClass(Game, [{
    key: "clean",
    value: function clean() {
      var vm = this;
      var parties = {};

      for (var i in vm.parties) {
        var party = vm.parties[i];

        if (this.getTotalPlayersFor(party.code) > 0) {
          parties[party.code] = party;
        }
      }

      this.parties = parties;
    }
  }, {
    key: "addPlayer",
    value: function addPlayer(code, ip, nik) {
      if (!this.parties.hasOwnProperty(code)) {
        this.parties[code] = new Party(code);
      }

      this.parties[code].players[ip] = new Player(ip, nik);
    }
  }, {
    key: "getTotalPlayersFor",
    value: function getTotalPlayersFor(code) {
      if (!this.parties.hasOwnProperty(code)) {
        return 0;
      }

      return Object.keys(this.parties[code].players).length;
    }
  }, {
    key: "getPlayersFor",
    value: function getPlayersFor(code) {
      if (!this.parties.hasOwnProperty(code)) {
        return {};
      }

      return this.parties[code].players;
    }
  }]);

  return Game;
}();

module.exports = Game;