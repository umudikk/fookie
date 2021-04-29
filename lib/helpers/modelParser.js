"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes; //SEQULIZE SCHEMA CONVERTER


module.exports = function (model) {
  if (model.name && model.schema && model.fookie) {
    for (var f in model.schema) {
      var type = model.schema[f].type ? model.schema[f].type : "integer";
      model.schema[f].type = DataTypes[type.toUpperCase()];
    }
  } else {
    console.log('Model yanlış gönüştürme yapılamaz.');
  }

  return model;
};