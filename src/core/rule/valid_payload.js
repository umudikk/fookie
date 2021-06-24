const lodash = require("lodash");
module.exports = async function (payload, ctx) {
   return !lodash.has(payload, "user") && !lodash.has(payload, "response" && !lodash.has(payload, "target"));
};
