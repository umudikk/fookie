
module.exports = async function (payload, ctx) {
   if (ctx.lodash.has(payload.options, "simplified") && payload.options.simplified == true) {
      if(ctx.lodash.isArray(payload.response.data )){
         payload.response.data = payload.response.data.map(data=>ctx.lodash.values(JSON.parse(JSON.stringify(data)))) ;
      }else {
         payload.response.data = ctx.lodash.values(JSON.parse(JSON.stringify(payload.response.data)));
      }
    
   }
};
