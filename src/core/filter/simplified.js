const lodash = require("lodash");
module.exports = async function (payload, ctx) {
   if (lodash.has(payload.options, "simplified") && payload.options.simplified === true) {
      payload.response.data = lodash.values(payload.response.data);
   } else {
   }
};
