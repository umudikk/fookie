module.exports = function (payload, ctx) {
   return ctx.lodash.keys(payload.body).every((k) => ctx.lodash.keys(ctx.models.get(payload.model).schema).includes(k));
};
