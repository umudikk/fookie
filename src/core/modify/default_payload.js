const deepMerge = require("deepmerge");
const lodash = require("lodash");
module.exports = async function (payload, ctx) {
   payload = deepMerge(payload, {
      options: {
         simplified: false,
         deep: false,
         attributes: null,
      },
      body: {},
      query: {},
      method: null,
      model: null,
      token: null,
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
