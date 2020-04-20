"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ValidateGameRequest = /*#__PURE__*/function () {
  function ValidateGameRequest() {
    _classCallCheck(this, ValidateGameRequest);
  }

  _createClass(ValidateGameRequest, [{
    key: "showRequest",
    value: function showRequest(req, res, next) {
      var _req$query = req.query,
          code = _req$query.code,
          nik = _req$query.nik;

      if (!code || code.trim() === '') {
        return res.redirect('/?error=emptyCode');
      }

      if (!code || code.trim().length !== 5) {
        return res.redirect("/?code=".concat(code, "&error=invalidCode"));
      }

      if (!nik || nik.trim() === '') {
        return res.redirect('/?error=emptyNik');
      }

      next();
    }
  }, {
    key: "createRequest",
    value: function createRequest(req, res, next) {
      var nik = req.query.nik;

      if (!nik || nik.trim() === '') {
        return res.redirect('/?error=emptyNik');
      }

      next();
    }
  }]);

  return ValidateGameRequest;
}();

exports["default"] = ValidateGameRequest;