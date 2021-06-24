module.exports = async function (payload, ctx) {
   console.log(payload);
   let rules = await ctx.helpers.defaultArrayCalc(payload, "rule");
   if (rules.every((i) => ctx.rules.has(i))) {
      for (let i of rules) {
         let res = await ctx.rules.get(i)(payload, ctx);
         if (!res) {
            payload.response.warnings.push(`false rule: ${i}`);
            return false;
         }
      }
      return true;
   } else {
      throw Error("Invalid Rule");
   }
};
