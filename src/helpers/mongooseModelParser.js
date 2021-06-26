let mongoose = require("mongoose");
const lodash = require('lodash')
const { Schema } = mongoose;

let DataTypes = {
   string: Schema.Types.String,
   number: Schema.Types.Number,
   date: Schema.Types.Date,
   buffer: Schema.Types.Buffer,
   boolean: Schema.Types.Boolean,
   object: Schema.Types.Mixed,
   _id: Schema.Types.ObjectId,
};

module.exports = function (model) {
   let schema = {};
   for (let f in model.schema) {
      schema[f] = {};
      if (typeof model.schema[f].relation == "string") model.schema[f].type = "_id";
      if (!lodash.keys(DataTypes).includes(model.schema[f].type))
         throw Error(`Invalid Type: ${model.schema[f].type} Model: ${model.name}`);

      schema[f].type = DataTypes[model.schema[f].type];
   }
   return schema;
};
