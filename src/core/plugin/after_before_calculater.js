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
      if(ctx.models.get(payload.model).gateway[payload.method]){
         a2 = ctx.models.get(payload.model).gateway[payload.method][mapName];
      }else{
         //console.log(payload.method,payload.model,1);
      }
      

      return [...a1, ...a2, ...a3];

      //todo test methodunda sıçıyor neden buraya giriyor araştır.

   };
};
