module.exports = async function (payload, ctx) {
   let type = "read"
   if (["patch", "post"].includes(payload.options.method)) {
      type = "write"
   }
   let model = ctx.models.get(payload.model);
   for (let field of ctx.lodash.keys(model.schema)) {
      let roles = model.schema[field][type]
      let show = true;
      for (let role of roles) {
         show = show && (await ctx.roles.get(role)(payload, ctx));
      }
      if (!show) {
         delete payload.response.data.schema[field];
      }
   }
};
