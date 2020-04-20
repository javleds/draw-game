"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = require('../models/game');

var GameController = /*#__PURE__*/function () {
  function GameController() {
    _classCallCheck(this, GameController);

    this.game = new Game();
  }

  _createClass(GameController, [{
    key: "create",
    value: function create(req, res) {
      var nik = req.query.nik;

      if (!nik || nik.trim() === '') {
        return res.redirect('/?error=emptyNik');
      }

      var randomCode = Math.random().toString(36).substring(2, 7);
      return res.redirect('/game?code=' + randomCode + '&nik=' + nik);
    }
  }, {
    key: "show",
    value: function show(req, res) {
      var code = req.query.code;
      var nik = req.query.nik;

      if (!code || code.trim() === '') {
        return res.redirect('/?error=emptyCode');
      }

      if (!code || code.trim() === '') {
        return res.redirect('/?code=' + code + '&error=invalidCode');
      }

      if (!nik || nik.trim() === '') {
        return res.redirect('/?error=emptyNik');
      }

      return res.render('game', {
        code: code,
        nik: nik
      });
    }
  }]);

  return GameController;
}();

module.exports = new GameController();