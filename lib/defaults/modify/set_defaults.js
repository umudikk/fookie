"use strict";

module.exports = function (_ref) {
  var query = _ref.query,
      options = _ref.options;

  if (Array.isArray(options.show) && options.show.every(function (a) {
    return typeof a == "string";
  })) {
    query.attributes = options.show;
  } else {}
};