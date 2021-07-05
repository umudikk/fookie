module.exports = async function (payload, ctx) {
   let rules = await ctx.helpers.defaultArrayCalc(payload, "rule");
   if (rules.every((i) => ctx.rules.has(i))) {
      for (let i of rules) {
         let res = await ctx.rules.get(i)(payload, ctx);
         if (res == false) {
            payload.response.warnings.push(`false rule: ${i}`);
            return false;
         }
      }

      return true;
   } else {
      payload.response.warnings.push("invalid rule", rules);
   }
};
