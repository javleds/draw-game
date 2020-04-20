"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _app = require("./app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app.app.use(_bodyParser["default"].json());

_app.app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

_app.app.use(_express["default"]["static"]('public'));

_app.app.set('views', _path["default"].join(__dirname, '/views'));

_app.app.set('view engine', 'pug');