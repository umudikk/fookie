module.exports = async function (payload, ctx) {
   let arr = ctx.helpers.defaultArrayCalc(payload, "effect");
   if (arr.every((e) => ctx.effects.has(e))) {
      arr.forEach((eff) => {
         ctx.effects.get(eff)(payload, ctx);
      });
   } else {
      throw Error("Missing Effect");
   }
};
