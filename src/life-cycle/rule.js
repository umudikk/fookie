module.exports = async function (payload) {
   let rules = await payload.ctx.helpers.defaultArrayCalc(payload, "rule");
   if (rules.every((i) => payload.ctx.rules.has(i))) {
      for (let i of rules) {
         let res = await payload.ctx.rules.get(i)(payload);
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
