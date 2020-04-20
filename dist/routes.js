"use strict";

var _app = require("./app");

_app.app.get('/', _app.controllers.homeController.index);

_app.app.get('/create', _app.middlewares.validateGameRequest.createRequest, _app.controllers.gameController.create);

_app.app.get('/game', _app.middlewares.validateGameRequest.showRequest, _app.controllers.gameController.show);