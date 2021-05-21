let mongoose = require('mongoose');
const { Schema } = mongoose;

let DataTypes = {
    string: Schema.Types.String,
    number: Schema.Types.Number,
    date: Schema.Types.Date,
    buffer: Schema.Types.Buffer,
    boolean: Schema.Types.Boolean,
    float: Schema.Types.Number,
    object: Schema.Types.Mixed,
    id: Schema.Types.ObjectId
}
//MONGOOSE SCHEMA CONVERTER
module.exports = function (model) {
    let _model = JSON.parse(JSON.stringify(model))
    let type="id"
    for (let f in _model.schema) {
        if (typeof _model.schema[f].relation == "string")
            type = "id"
        if (_model.schema[f].type) {
            type = _model.schema[f].type
        }   
        _model.schema[f].type = DataTypes[type]
    }
    return _model.schema
}