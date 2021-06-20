const jwt = require("jsonwebtoken");
const { sha512 } = require("js-sha512");
module.exports = async function (ctx) {
   let system_user = ctx.models.get("system_user");

   let res = await ctx.run({
      user: { system: true },
      model: "system_user",
      method: "count",
   });
   console.log(res);
   let count = res.data;
   if (count == 0) {
      let user = await ctx.run({
         user: { system: true },
         model: "system_user",
         method: "post",
         body: {
            email: "admin",
            password: "admin",
            type: "normal",
         },
      });
      await ctx.run({
         user: { system: true },
         model: "system_admin",
         method: "post",
         body: {
            system_user: user.data._id,
         },
      });
   }

   system_user.methods.set("login", async ({ body, response, model, ctx }) => {
      let { email, password } = body;

      let res = await ctx.run({
         user: { system: true },
         model: "system_user",
         method: "get",
         query: {
            email,
            password: sha512(password),
         },
      });
      let user = res.data;
      if (user) {
         const token = jwt.sign({ _id: user._id }, ctx.store.get("secret"));
         return token;
      } else {
         response.status = 201;
         response.warnings.push("login not system_model");
         return false;
      }
   });

   system_user.methods.set("register", async ({ body, response, ctx }) => {
      let { email, password } = body;
      let res = await ctx.run({
         user: { system: true },
         model: "system_user",
         method: "count",
         query: {
            email,
            password: sha512(password),
         },
      });
      let count = res.data;
      if (count != 0) {
         response.status = 201;
         return false;
      } else {
         user = await ctx.run({
            user: { system: true },
            model: "system_user",
            method: "post",
            query: {
               email,
               password: sha512(password),
            },
         });
         return true;
      }
   });
};
