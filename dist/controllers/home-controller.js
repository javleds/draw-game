"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomeController = /*#__PURE__*/function () {
  function HomeController() {
    _classCallCheck(this, HomeController);
  }

  _createClass(HomeController, [{
    key: "index",
    value: function index(req, res) {
      var _req$query = req.query,
          error = _req$query.error,
          code = _req$query.code;
      return res.render('index', {
        error: error,
        code: code
      });
    }
  }]);

  return HomeController;
}();

exports["default"] = HomeController;