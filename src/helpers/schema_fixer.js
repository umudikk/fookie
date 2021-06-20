const deepMerge = require("deepmerge");
module.exports = function (model) {
   let methods = ["post", "get", "getAll", "patch", "delete", "schema", "test"];

   for (let f of Object.keys(model.schema)) {
      model.schema[f] = deepMerge(model.schema[f], {
         write: [],
         read: [],
      });
   }

   for (let method of methods) {
      model.fookie[method] = deepMerge(model.fookie[method], {
         modify: [],
         effect: [],
         rule: [],
         role: [],
         filter: [],
      });
   }

   model.mixin = deepMerge(model.mixin, []);
};
