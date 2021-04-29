"use strict";

module.exports = function (_ref) {
  var user = _ref.user,
      req = _ref.req,
      model = _ref.model,
      body = _ref.body,
      method = _ref.method,
      result = _ref.result,
      ctx = _ref.ctx;
  return Object.keys(body).every(function (k) {
    return Object.keys(model.schema).includes(k);
  });
};