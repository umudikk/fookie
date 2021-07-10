module.exports = function (payload, ctx) {
   return ctx.lodash.has(payload,"body");
};
