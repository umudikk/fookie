module.exports = async function (payload, ctx) {
   let filters = await ctx.helpers.defaultArrayCalc(payload, "filter");
   if (filters.every((i) => ctx.filters.has(i))) {
      for (let i of filters) {
         await ctx.filters.get(i)(payload, ctx);
      }
   } else {
     payload.response.warnings.push("Missing Filter")
   }
};
