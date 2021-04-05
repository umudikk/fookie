const { DataTypes } = require('sequelize')

//SEQULIZE SCHEMA CONVERTER
module.exports = function(model) {
    if (model.name && model.schema && model.fookie) {
        console.log(model.name);
        for (let f in model.schema) {


            model.schema[f].type = DataTypes[model.schema[f].type.toUpperCase()]
        }
    } else {
        console.log('Model yanlış gönüştürme yapılamaz.');
    }
    return model
}