module.exports = async function (payload) {
   let rules = await payload.ctx.helpers.defaultArrayCalc(payload, "preRule");
   for (let i of rules) {
      if (payload.ctx.rules.has(i)) {
         let res = await payload.ctx.rules.get(i)(payload);
         console.log(res, i);
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${i}`);
            return false;
         }
      } else {
         payload.response.warnings.push(`Mssing preRule: ${i}`);
         return false;
      }
   }
   return true;
};

