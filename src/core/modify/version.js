module.exports = async function (payload, ctx) {
   if (payload.options.version) {
      payload.query.__v = ctx.package.version;
   }
   if (payload.method == "post") {
      payload.body.__v = ctx.package.version;
   }
};
