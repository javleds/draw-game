"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.middlewares = exports.controllers = exports.models = exports.io = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _game = _interopRequireDefault(require("./models/game"));

var _validateGameRequest = _interopRequireDefault(require("./middlewares/validate-game-request"));

var _gameController = _interopRequireDefault(require("./controllers/game-controller"));

var _homeController = _interopRequireDefault(require("./controllers/home-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.port = 3000;
    this.app = (0, _express["default"])();
    this.server = _http["default"].Server(this.app);
    this.io = (0, _socket["default"])(this.server);
    this.instantiateMiddlewares();
    this.instantiateModels();
    this.instantiateControllers();
  }

  _createClass(App, [{
    key: "instantiateMiddlewares",
    value: function instantiateMiddlewares() {
      this.middlewares = {
        validateGameRequest: new _validateGameRequest["default"]()
      };
    }
  }, {
    key: "instantiateModels",
    value: function instantiateModels() {
      this.models = {
        game: new _game["default"]()
      };
    }
  }, {
    key: "instantiateControllers",
    value: function instantiateControllers() {
      this.controllers = {
        gameController: new _gameController["default"](),
        homeController: new _homeController["default"]()
      };
    }
  }, {
    key: "start",
    value: function start() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Example app listening on http://localhost:3000';
      this.server.listen(this.port, function () {
        console.log(message);
      });
    }
  }]);

  return App;
}();

var theApp = new App();
var app = theApp.app;
exports.app = app;
var io = theApp.io;
exports.io = io;
var models = theApp.models;
exports.models = models;
var controllers = theApp.controllers;
exports.controllers = controllers;
var middlewares = theApp.middlewares;
exports.middlewares = middlewares;
var _default = theApp;
exports["default"] = _default;