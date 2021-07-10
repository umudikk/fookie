module.exports = async function (payload, ctx) {
   ctx.metrics.request.inc()
};
