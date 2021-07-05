module.exports = async function (payload, ctx) {
   let type = "read"
   if (["patch", "post"].includes(payload.options.method)) {
      type = "write"
   }

   let model = ctx.models.get(payload.model);
   console.log(model.schema);
   for (let field of ctx.lodash.keys(model.schema)) {

      let roles = model.schema[field][type]//.concat(model.fookie[payload.options.method].role);
      let show = true;

      for (let role of roles) {
         show = show && (await ctx.roles.get(role)(payload, ctx));
      }
      if (!show) {
         delete payload.response.data.schema[field];

      }
   }
   console.log(payload.response.data.schema, 1);
};
