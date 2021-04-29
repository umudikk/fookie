"use strict";

module.exports = function (_ref) {
  var user = _ref.user,
      req = _ref.req,
      body = _ref.body,
      model = _ref.model,
      method = _ref.method,
      result = _ref.result,
      ctx = _ref.ctx;
  return body.password != null && body.email != null;
};