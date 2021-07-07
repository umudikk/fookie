module.exports = async function (payload, ctx) {
   //todo lodash ile kontrol et bu yöntem çöp

   let search = ["", null, undefined];
   let model = ctx.models.get(payload.model);
   let keys = ctx.lodash.keys(model.schema);
   for (let key of keys) {
      if (model.schema[key].required == true) {
         if (ctx.lodash.isNull(payload.body[key])) {
            return false;
         }
      }
   }
   return true;
};
