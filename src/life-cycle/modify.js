import defaultArrayCalc from "../helpers/defaultArrayCalc.js";
export default async function (payload) {
   let arr = defaultArrayCalc(payload, "modify");
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
}
