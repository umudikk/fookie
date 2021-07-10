module.exports = async function (payload, ctx) {
   for (let rule of ctx.store.get("first_of_all")) {
      let res = await ctx.rules.get(rule)(payload, ctx);
      if (res ==false) {
         payload.response.warnings.push(`false first of all: ${rule}`);
         return false;
      }
   }

   let rules = ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (rules.every((rule) => ctx.rules.has(rule))) {
      for (let rule of rules) {
         let res = await ctx.rules.get(rule)(payload, ctx);
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${rule}`);
            return false;
         }
      }
      return true;
   } else {
      payload.response.warnings.push(`Missing preRule`,rules);
      return false     
   }
};
