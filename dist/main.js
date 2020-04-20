"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./bootrstap");

require("./routes");

require("./sockets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].start();