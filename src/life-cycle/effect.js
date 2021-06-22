module.exports = async function (payload) {
   let arr = await payload.ctx.helpers.defaultArrayCalc(payload, "effect");
   if (arr.every((e) => payload.ctx.effects.has(e))) {
      arr.forEach((eff) => {
         payload.ctx.effects.get(eff)(payload);
      });
   } else {
      throw Error("Missing Effect");
   }
};
