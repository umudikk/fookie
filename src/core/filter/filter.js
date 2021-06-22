//const filter = require("../../helpers/filter")
module.exports = async function (payload) {
   console.log("fiter");
   return;
   if (Array.isArray(payload.response.data)) {
      let arr = [];
      for (let r of payload.response.data) {
         arr.push(await filter(payload, r));
      }
      payload.response.data = arr;
   } else {
      payload.response.data = await filter(payload, payload.response.data);
   }
};
