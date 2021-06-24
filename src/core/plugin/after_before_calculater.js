module.exports = function (ctx) {
   ctx.helpers.defaultArrayCalc = function (payload, mapName) {
      let lodash = ctx.helpers.lodash;
      let a1 = [];
      let a2 = [];
      let a3 = [];

      if (lodash.has(ctx.store.get("default_life_cycle_controls")[payload.method], mapName)) {
         a1 = ctx.store.get("default_life_cycle_controls")[payload.method][mapName].before;
         a3 = ctx.store.get("default_life_cycle_controls")[payload.method][mapName].after;
      }
      a2 = ctx.models.get(payload.model).fookie[payload.method][mapName];

      return [...a1, ...a2, ...a3];
   };
};
