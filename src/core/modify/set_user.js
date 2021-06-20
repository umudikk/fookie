const jwt = require("jsonwebtoken");
module.exports = async function (payload) {
   if (payload.hasOwnProperty("user")) if (payload.user.hasOwnProperty("system")) return payload.user.system;

   let parsed = false;
   try {
      parsed = jwt.verify(payload.token, payload.ctx.store.get("secret"));
   } catch (error) {
      payload.response.warnings.push("invalid token");
   }
   let userResponse = await payload.ctx.run({
      user: { system: true },
      model: "system_user",
      method: "get",
      query: {
         _id: parsed._id,
      },
   });

   if (userResponse.status == 200) {
      payload.user = userResponse.data;
   } else {
      payload.user = {};
   }
};
