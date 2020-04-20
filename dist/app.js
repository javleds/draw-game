"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _homeController = _interopRequireDefault(require("./controllers/home-controller"));

var _gameController = _interopRequireDefault(require("./controllers/game-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var server = _http["default"].Server(app);

var io = (0, _socket["default"])(server);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"]('public'));
app.set('views', _path["default"].join(__dirname, '/views'));
app.set('view engine', 'pug');
app.get('/', _homeController["default"].index);
app.get('/create', _gameController["default"].create);
app.get('/game', _gameController["default"].show);
io.on('connection', function (socket) {
  socket.on('join', function (data) {
    socket.join(data.code, function () {
      _gameController["default"].game.addPlayer(data.code, data.ip, data.nik);

      var emitData = {
        players: _gameController["default"].game.getPlayersFor(data.code),
        totalPlayers: _gameController["default"].game.getTotalPlayersFor(data.code)
      };
      io.to(data.code).emit('joinConfirmation', emitData);
      socket.broadcast.to(data.code).emit('addPlayer', emitData);
      console.log('game', _gameController["default"].game);
    });
  });
  socket.on('disconnect', function () {// TODO: Fix next method
    // gameController.game.clean()
    // TODO: Leave channel if it is not exists anymore
  });
});
server.listen(3000, function () {
  console.log('Example app listening on port 3000');
});