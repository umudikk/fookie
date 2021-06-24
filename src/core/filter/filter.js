async function filter(payload, data, type, ctx) {
   let model = ctx.models.get(payload.model);
   for (let key of Object.keys(model.schema)) {
      let requiredRoles = model.schema[key][type];
      if (requiredRoles.every((i) => ctx.roles.has(i))) {
         for (let i of requiredRoles) {
            let res = await ctx.roles.get(i)(payload, ctx);
            if (!res) {
               data[key] = undefined;
            }
         }
      } else {
         throw Error("Mssing Roles");
      }
   }
}

module.exports = async function (payload, ctx) {
   return;
   let type = "write";
   if (["get", "getAll"].includes(payload.method)) type = "read";
   if (Array.isArray(payload.response.data)) {
      let arr = [];
      for (let r of ctx.helpers.lodash.cloneDeep(payload.response.data)) {
         arr.push(await filter(payload, r, type, ctx));
      }
      payload.response.data = arr;
   } else {
      payload.response.data = await filter(payload, ctx.helpers.lodash.cloneDeep(payload.response.data), type, ctx);
   }
};
