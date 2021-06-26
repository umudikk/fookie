module.exports = function (payload, ctx) {
   let keys = ctx.lodash.keys(ctx.models.get(payload.model).schema);
   keys = keys.filter((k) => ctx.models.get(payload.model).schema[k].default);
   keys.forEach((k) => {
      if (payload.body[k] == undefined) {
         payload.body[k] = ctx.models.get(payload.model).schema[k].default;
      }
   });
};
