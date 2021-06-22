module.exports = async function (payload) {
   for (let rule of payload.ctx.store.get("first_of_all")) {
      let res = await payload.ctx.rules.get(rule)(payload);
      if (!res) {
         payload.response.warnings.push(`false first of all: ${rule}`);
         return false;
      }
   }

   let rules = await payload.ctx.helpers.defaultArrayCalc(payload, "preRule");
   if (rules.every((rule) => payload.ctx.rules.has(rule))) {
      for (let rule of rules) {
         let res = payload.ctx.rules.get(rule)(payload);
         if (res == false) {
            payload.response.warnings.push(`false preRule: ${rule}`);
            return false;
         }
      }
      return true;
   } else {
      throw Error("Invalid Rule");
   }
};
