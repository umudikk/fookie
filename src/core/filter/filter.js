async function filter(payload,data,type){
   let model = payload.ctx.models.get(payload.model)
   for (let key of Object.keys(payload.response.data)) {
       let requiredRoles = model.schema[key][type]
       if (requiredRoles.every(i => payload.ctx.roles.has(i))) {
           for (let i of requiredRoles) {
               let res =  await payload.ctx.roles.get(i)(payload)
               if(!res){
                 data[key] = undefined
               }
           
           }
       } else {
           throw Error('Mssing Roles')
       }
   }
}

module.exports = async function (payload) {
   let type ="write"
   if(["get","getAll"].includes(payload.method)) type = "read"
   if (Array.isArray(payload.response.data)) {
      let arr = [];
      for (let r of payload.ctx.helpers.lodash.cloneDeep(payload.response.data)) {
         arr.push(await filter(payload, r,type));
      }
      payload.response.data = arr;
   } else {
      payload.response.data = await filter(payload, payload.ctx.helpers.lodash.cloneDeep(payload.response.data),type);
   }
};
