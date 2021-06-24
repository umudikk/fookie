module.exports = async function (payload, ctx) {
   if (payload.method == "post") {
      payload.target = ctx.models.get(payload.model).model(payload.body);
   } else {
      let res = await ctx.run({
         user: { system: true },
         model: payload.model,
         method: "get",
         query: payload.query,
      });
      payload.target = res.data;
   }
};
