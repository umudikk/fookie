module.exports = async function (payload, ctx) {
   let model = ctx.models.get(payload.model);
   let fields = ctx.lodash.keys(payload.body);
   let res = true;
   for (let field of fields) {
      if (model.schema[field].min) {
         res = res && ctx.lodash.lt(payload.body[field], model.schema[field].min);
      }
      if (model.schema[field].max) {
         res = res && ctx.lodash.gt(payload.body[field], model.schema[field].min);
      }

      if (model.schema[field].equal) {
         res = res && ctx.lodash.isEqual(payload.body[field], model.schema[field].min);
      }

      if (model.schema[field].notEqual) {
         res = res && !ctx.lodash.isEqual(payload.body[field], model.schema[field].min);
      }

      if (model.schema[field].includes) {
         res = res && ctx.lodash.includes(payload.body[field], model.schema[field].min);
      }
      if (model.schema[field].maxLength) {
         res = res && payload.body[field].length < model.schema[field].maxLength;
      }
      if (model.schema[field].minLength) {
         res = res && payload.body[field].length < model.schema[field].minLength;
      }
   }

   return res;
};
