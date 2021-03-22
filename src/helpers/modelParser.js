const { DataTypes } = require('sequelize')

module.exports = function(model) {
    if (model.name && model.schema && model.fookie) {
        for (let f in model.schema) {
            model.schema[f].type = DataTypes[model.schema[f].type]
        }
    } else {
        console.log('Model yanlış gönüştürme yapılamaz.');
    }
    return model
}