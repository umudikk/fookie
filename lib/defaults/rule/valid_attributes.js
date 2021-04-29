"use strict";

module.exports = function (_ref) {
  var user = _ref.user,
      req = _ref.req,
      model = _ref.model,
      body = _ref.body,
      method = _ref.method,
      options = _ref.options,
      result = _ref.result,
      ctx = _ref.ctx;

  if (options.attributes && Array.isArray(options.attributes) && options.attributes.every(function (a) {
    return typeof a == "string";
  })) {
    return Object.keys(options.attributes).every(function (k) {
      return Object.keys(model.schema).includes(k);
    });
  } else {
    return true;
  }
};