"use strict";

var http = require('http');

function hasFields(Model, body) {
  var fields = Object.keys(Model.fieldRawAttributesMap);
  var keys = Object.keys(body);
  return keys.every(function (key) {
    return fields.includes(key);
  });
}

function response(status, data) {
  if (http.STATUS_CODES[String(status)]) {
    return {
      status: status,
      message: http.STATUS_CODES[String(status)],
      data: data
    };
  } else {
    return {
      status: 500,
      message: 'Invalid Status',
      data: data
    };
  }
}

function clear(document) {
  var res = {};

  for (var i in document) {
    if (i == "id" || i == "updatedAt" || i == "createdAt") {} else {
      res[i] = document[i];
    }
  }

  return res;
}

module.exports.hasFields = hasFields;
module.exports.response = response;
module.exports.clear = clear;