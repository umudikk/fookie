module.exports = function (payload, ctx) {
   return Object.keys(payload.body).every((k) => Object.keys(ctx.models.get(payload.model).schema).includes(k));
};
