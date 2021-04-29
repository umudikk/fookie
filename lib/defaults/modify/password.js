"use strict";

var _require = require('js-sha512'),
    sha512 = _require.sha512;

module.exports = function (_ref) {
  var user = _ref.user,
      method = _ref.method,
      model = _ref.model,
      body = _ref.body,
      ctx = _ref.ctx;
  body.password = sha512(body.password);
};