module.exports = async function (payload, ctx) {
   if (!ctx.lodash.has(payload,"user")) return false;
   let res = await ctx.run({
      system: true,
      model: "system_admin",
      method: "count",
      query: {
         system_user: payload.user._id,
      },
   });
   let count = res.data;
   return count >= 1;
};
