module.exports = async function (payload, ctx) {
   payload = ctx.lodash.merge(payload, {
      options: {
         simplified: false,
         deep: false,
         attributes: undefined,
      },
      response: {
         data: undefined,
         warnings: [],
         status: 200
      },
      body: {},
      query: {},
      method: undefined,
      model: undefined,
      token: undefined,
      user: {},
   });
   /*
   payload.method = payload.hasOwnProperty("method") ? payload.method : "";
   payload.body = payload.hasOwnProperty("body") ? payload.body : {};
   payload.model = payload.hasOwnProperty("model") ? payload.model : "";
   payload.query = payload.hasOwnProperty("query") ? payload.query : {};
   payload.token = payload.hasOwnProperty("token") ? payload.token : "";
   payload.options = payload.hasOwnProperty("options") ? payload.options : {};
   */
};
