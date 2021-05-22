let mongoose = require('mongoose');
const deepMerge = require("deepmerge")
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
    let type = "id"
    for (let f in _model.schema) {
        if (typeof _model.schema[f].relation == "string")
            type = "id"
        if (_model.schema[f].type) {
            type = _model.schema[f].type
        }
        _model.schema[f].type = DataTypes[type]
    }

    let methods = ["post", "get", "getAll", "patch", "delete", "schema", "test"]

    let field = {
        write: [],
        read: [],
    }

    let tmp = {
        modify: [],
        effect: [],
        rule: [],
        role: [],
        filter: [],
    }

    for (let f of Object.keys(model.schema)) {
        model.schema[f] = deepMerge(model.schema[f], field)
    }

    for (let method of methods) {

        model.fookie[method] = deepMerge(model.fookie[method], tmp)
    }
    return _model.schema

}