const { DataTypes } = require('sequelize')

//SEQULIZE SCHEMA CONVERTER
module.exports = function (model) {
    if (model.name && model.schema && model.fookie) {
        for (let f in model.schema) {
            let type = model.schema[f].type ? model.schema[f].type : "integer"
            model.schema[f].type = DataTypes[type.toUpperCase()]
        }
    } else {
        console.log('Model yanlış gönüştürme yapılamaz.');
    }
    return model
}