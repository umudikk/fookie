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
}
//MONGOOSE SCHEMA CONVERTER
module.exports = function (model) {
    let _model = JSON.parse(JSON.stringify(model))
    for (let f in _model.schema) {
        if (_model.schema[f].type) {
            type = _model.schema[f].type
        }

        _model.schema[f].type = DataTypes[type]
        if (typeof _model.schema[f].relation == "string")
            _model.schema[f].type = Schema.Types.ObjectId
    }
    return _model.schema
}