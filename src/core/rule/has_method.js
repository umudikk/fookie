module.exports = async function (payload) {
   if (payload.hasOwnProperty("method") && typeof payload.method == "string") {
      let model = payload.ctx.models.get(payload.model);
      if (model.methods.has(payload.method)) {
         console.log(payload.model, payload.method, "has_method");
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
