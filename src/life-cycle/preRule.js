module.exports = async function (payload) {
      let rules = await payload.ctx.helpers.defaultArrayCalc(payload, "preRule");
      if (rules.every((i) => payload.ctx.rules.has(i))) {
         for (let i of rules) {
            let res = payload.ctx.rules.get(i)(payload);
            if (res == false) {
               payload.response.warnings.push(`false preRule: ${i}`);
               return false
            }
         }
         return true
      } else {
         throw Error("Invalid Rule");
      } 
}
