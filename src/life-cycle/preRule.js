module.exports = async function (payload) {
      let rules = await payload.ctx.helpers.defaultArrayCalc(payload, "preRule");
      console.log(rules," <-");
      if (rules.every((i) => payload.ctx.rules.has(i))) {
         for await (let i of rules) {
            let res = await payload.ctx.rules.get(i)(payload);
            console.log(res,i," <-");
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
