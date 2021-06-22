module.exports = async function (payload) {
   let arr = await payload.ctx.helpers.defaultArrayCalc(payload, "modify");
   if (
      arr.every(function (e) {
         return payload.ctx.modifies.has(e);
      })
   ) {
      for (let m of arr) {
         await payload.ctx.modifies.get(m)(payload);
      }
   } else {
      throw Error("Missing modify");
   }
};
