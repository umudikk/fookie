"use strict";

module.exports = function (model, key, selector) {
  if (model.schema[key][selector]) {
    return model.schema[key][selector];
  } else {
    return [];
  }
};