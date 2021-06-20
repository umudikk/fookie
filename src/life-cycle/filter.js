import defaultArrayCalc from "../helpers/defaultArrayCalc.js";
export default async function (payload) {
   let filters = defaultArrayCalc(payload, "filter");

   if (filters.every((i) => payload.ctx.rules.has(i))) {
      for (let i of filters) {
         await payload.ctx.filters?.get(i)(payload);
      }
   } else {
      throw Error("Invalid Rule");
   }
}
