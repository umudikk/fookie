module.exports = function (payload, ctx) {
   let keys = ctx.lodash.keys(ctx.models.get(payload.model).schema);
   keys = keys.filter((k) => ctx.models.get(payload.model).schema[k].default);
   keys.forEach((k) => {
      let modify = ctx.modifies.get(ctx.models.get(payload.model).schema[k].default);
      if (body[k] == undefined) {
         body[k] = modify(payload, ctx);
      }
   });
};
