"use strict";

module.exports = function (_ref) {
  var model = _ref.model,
      body = _ref.body;
  var keys = Object.keys(model.schema);
  keys = keys.filter(function (k) {
    return model.schema[k]["default"];
  });
  keys.forEach(function (k) {
    body[k] = model.schema[k]["default"];
  });
};