const jwt = require("jsonwebtoken");
module.exports = async function (payload, ctx) {
   if (ctx.lodash.has(payload, "system")) return payload.system;

   let parsed = false;
   try {
      parsed = jwt.verify(payload.token, ctx.store.get("secret"));
   } catch (error) {
      payload.response.warnings.push("invalid token");
   }
   let userResponse = await ctx.run({
      system: true,
      model: "system_user",
      method: "get",
      query: {
         _id: parsed._id,
      },
   });

   if (userResponse.data) {
      payload.user = userResponse.data;
   }
};
