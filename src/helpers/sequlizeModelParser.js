const { DataTypes } = require('sequelize')

//SEQULIZE SCHEMA CONVERTER
module.exports = function (schema) {
    let ormSchema = JSON.parse(JSON.stringify(schema));
    for (let f in ormSchema) {
        let type = "number"
        if (ormSchema[f].type) {
            type = ormSchema[f].type
        } else {
            schema[f].type = "number"
        }

        ormSchema[f].type = DataTypes[type.toUpperCase()]
    }
    return ormSchema
}