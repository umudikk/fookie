module.exports = function (ctx) {
   let lodash = ctx.helpers.lodash;
   ctx.helpers.defaultArrayCalc = async function (payload, mapName) {
      let arr = [];

      if (lodash.has(payload.ctx.store.get("default_life_cycle_controls"), payload.method)) {
         arr = lodash.concat(arr, payload.ctx.store.get("default_life_cycle_controls")[payload.method][mapName].before);
         arr = lodash.concat(arr, payload.ctx.models.get(payload.model).fookie[payload.method][mapName]);
         arr = lodash.concat(arr, payload.ctx.store.get("default_life_cycle_controls")[payload.method][mapName].after);
      }

      return arr.filter((item) => item != undefined);
   };
};
