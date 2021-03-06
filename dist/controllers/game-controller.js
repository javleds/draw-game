"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _game = _interopRequireDefault(require("../models/game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameController = /*#__PURE__*/function () {
  function GameController() {
    _classCallCheck(this, GameController);

    this.game = new _game["default"]();
  }

  _createClass(GameController, [{
    key: "create",
    value: function create(req, res) {
      var nik = req.query.nik;
      var randomCode = Math.random().toString(36).substring(2, 7);
      return res.redirect("/game?code=".concat(randomCode, "&nik=").concat(nik));
    }
  }, {
    key: "show",
    value: function show(req, res) {
      var _req$query = req.query,
          code = _req$query.code,
          nik = _req$query.nik;
      return res.render('game', {
        code: code,
        nik: nik
      });
    }
  }]);

  return GameController;
}();

exports["default"] = GameController;