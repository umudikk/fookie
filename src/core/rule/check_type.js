var validate = require("validate.js");

let validators = {
   boolean: "isBoolean",
   string: "isString",
   number: "isNumber",
   object: "isObject",
   date: "isDate",
   time: "isTime",
};
module.exports = async function (payload) {
   for (field of Object.keys(payload.body)) {
      let isValid = false;
      if (typeof payload.ctx.models.get(payload.model).schema[field].relation == "string") {
         isValid = true;
      } else {
         isValid = await validate[validators[payload.ctx.models.get(payload.model).schema[field].type]](
            payload.body[field]
         );
      }
      if (!isValid) {
         response.warnings.push(
            `[Check_Type] Invalid type: ${payload.ctx.models.get(payload.model).schema[field].type}`
         );
         response.warnings.push(`[Check_Type] Invalid value: ${payload.body[field]}`);
         return false;
      }
   }
   return true;
};
