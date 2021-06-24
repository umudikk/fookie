module.exports = async function (payload, ctx) {
   return payload.options.hasOwnProperty("method") && typeof payload.options.method == "string";
};
