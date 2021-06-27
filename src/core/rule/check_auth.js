
const lodash = require('lodash')
module.exports = async function (payload, ctx) {
   console.log();
   if (lodash.has(payload.user, 'system')) {
      return payload.user.system;
   }
   let roles = [];

   roles = roles.concat(ctx.helpers.defaultArrayCalc(payload, "role"));

   let keys = lodash.keys(payload.body)
   if (["post", "patch"].includes(payload.method)) {
      keys.forEach((key) => {
         roles = roles.concat(ctx.models.get(payload.model).schema[key].write);
      });
   }

   if (roles.length == 0) return true;
   if (roles.every((e) => ctx.roles.has(e))) {
      for (let role of roles) {
         let res = await ctx.roles.get(role)(payload, ctx);
         if (res) return true;

         payload.response.warnings.push(`You are not: ${role}`);
         let modifies = [];
         try {
            modifies = ctx.models.get(payload.model).fookie[payload.method].reject[role];
         } catch (error) { }
         await Promise.all(modifies.map((m) => ctx.modifies.get(m)(payload, ctx)));
      }
      return false;
   } else {
      throw Error("Missing role");
   }
};
