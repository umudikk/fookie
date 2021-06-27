module.exports = async function (payload, ctx) {
   let res = await ctx.run({
      user: { system: true },
      model: payload.model,
      method: "get",
      query: payload.query,
   });
   payload.target = res.data;
};
