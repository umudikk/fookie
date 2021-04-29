"use strict";

module.exports = function (_ref) {
  var user = _ref.user,
      method = _ref.method,
      model = _ref.model,
      result = _ref.result,
      ctx = _ref.ctx;
  ctx.models.forEach(function (model) {
    var tmp = {};

    for (var i in model) {
      if (i != "model") {
        tmp[i] = model[i];
      }
    }

    result.push(tmp);
  });
  return result;
};