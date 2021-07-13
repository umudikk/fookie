module.exports = async function (payload, ctx) {
   if (payload.hasOwnProperty("method") && typeof payload.method == "string") {
      let model = ctx.models.get(payload.model);
   console.log(payload);
      if (ctx.databases.get(model.database).methods.has(payload.method)) {
         return true;
      } else {
         payload.response.warnings.push("Has method err");
         return false;
      }
   } else {
      payload.response.warnings.push("Has method err");
      return false;
   }
};
