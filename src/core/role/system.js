module.exports = async function (payload,ctx) {
   return ctx.lodash.has(payload,'system')
};
