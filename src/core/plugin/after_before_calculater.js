module.exports = function (ctx) {
   ctx.helpers.defaultArrayCalc = async function (payload, mapName) {
      let lodash = ctx.helpers.lodash;
      let arr = [];
      arr = lodash.concat(arr, payload.ctx.store.get("default_life_cycle_controls")[payload.method][mapName].before);
      arr = lodash.concat(arr, payload.ctx.models.get(payload.model).fookie[payload.method][mapName]);
      arr = lodash.concat(arr, payload.ctx.store.get("default_life_cycle_controls")[payload.method][mapName].after);

      return arr
   };
};
