module.exports = async function (payload) {
   payload = payload.ctx.helpers.deepMerge(payload,{
      options:{
         simplified:false,
         deep:false,
         attributes:"",
      },
      body:{},
      query:{},
      method:"get",
      model:"system_user",
      token:"",
      user:{},

   })
   /*
   payload.method = payload.hasOwnProperty("method") ? payload.method : "";
   payload.body = payload.hasOwnProperty("body") ? payload.body : {};
   payload.model = payload.hasOwnProperty("model") ? payload.model : "";
   payload.query = payload.hasOwnProperty("query") ? payload.query : {};
   payload.token = payload.hasOwnProperty("token") ? payload.token : "";
   payload.options = payload.hasOwnProperty("options") ? payload.options : {};
   */
};
