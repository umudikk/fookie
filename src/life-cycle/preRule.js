module.exports = async function (payload) {
   let rules = payload.ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (await rules.every((i) => payload.ctx.rules.has(i))) {
      for (let i = 0; i < rules.length; i++) {
         let res = await payload.ctx.rules.get(rules[i])(payload);
         console.log(res, rules[i]);
         if (!res) {
            payload.response.warnings.push(`false preRule: ${rules[i]}`);
            return false;
         }
      }

      return true;
   } else {
      throw Error("Invalid Rule");
   }
};
