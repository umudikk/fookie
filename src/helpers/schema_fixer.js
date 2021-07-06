const deepMerge = require("deepmerge");
const lodash = require('lodash')
module.exports = function (model) {
   let methods = ["post", "get", "getAll", "patch", "delete", "model", "count", "test"];
   methods = methods.concat(lodash.keys(model.fookie))
   methods = lodash.uniq(methods)

   for (let f of lodash.keys(model.schema)) {
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
         preRule: [],
         role: [],
         filter: [],
      });
   }
   model.mixin = deepMerge(model.mixin, ["default_mixin"]);
};
