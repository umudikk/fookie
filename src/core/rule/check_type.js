var validate = require("validate.js");
//todo lodash
let validators = {
   boolean: "isBoolean",
   string: "isString",
   number: "isNumber",
   object: "isObject",
};
module.exports = async function (payload, ctx) {
   for (field of ctx.lodash.keys(payload.body)) {
      let isValid = false;
      if (typeof ctx.models.get(payload.model).schema[field].relation == "string") {
         isValid = true;
      } else {
         isValid = await validate[validators[ctx.models.get(payload.model).schema[field].type]](payload.body[field]);
      }
      if (!isValid) {
         payload.response.warnings.push(
            `[Check_Type] Invalid type: ${ctx.models.get(payload.model).schema[field].type}`
         );
         payload.response.warnings.push(`[Check_Type] Invalid value: ${payload.body[field]}`);
         return false;
      }
   }
   return true;
};
