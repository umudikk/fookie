const jwt = require("jsonwebtoken");
const { sha512 } = require("js-sha512");
const user = require("./model/system_user")
module.exports = async function (ctx) {
   await ctx.model(user)
   let sys_user = ctx.models.get("user")
   let res = await ctx.run({
      system: true,
      model: "user",
      method: "count",
   });
   let count = res.data;
   if (count == 0) {
      let user = await ctx.run({
         system: true,
         model: "user",
         method: "post",
         body: {
            email: "admin",
            password: "admin",
            type: "normal",
         },
      });
      await ctx.run({
         system: true,
         model: "dmin",
         method: "post",
         body: {
            user: user.data._id,
         },
      });
   }

   sys_user.methods.set("login", async ({ body, response }, ctx) => {
      let { email, password } = body;
      let res = await ctx.run({
         system: true,
         model: "user",
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
         response.warnings.push("login not model");
         return false;
      }
   });

   sys_user.methods.set("register", async ({ body, response }, ctx) => {
      let { email, password } = body;
      let res = await ctx.run({
         system: true,
         model: "system_user",
         method: "post",
         body: {
            email,
            password: sha512(password),
         },
      });

      return res.status == 200;
   });
   ctx.rule("is_last_admin",async function (payload,ctx){
      let res = await ctx.run({
         system:true,
         method:"count",
         model:"system_admin"
      })

      return res.data != 1
   })
};
