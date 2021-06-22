module.exports = async function (payload) {
   let lodash = payload.helpers.lodash;
   return !lodash.has(payload, "user") && !lodash.has(payload, "response" && !lodash.has(payload, "target"));
};
