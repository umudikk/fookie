import defaultArrayCalc from "../helpers/defaultArrayCalc.js";

export default function (payload) {
   let arr = defaultArrayCalc(payload, "effect");
   if (arr.every((e) => payload.ctx.effects.has(e))) {
      arr.forEach((eff) => {
         payload.ctx.effects.get(eff)(payload);
      });
   } else {
      throw Error("Missing Effect");
   }
}
