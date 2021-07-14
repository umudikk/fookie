module.exports = async function (payload, ctx) {
    await ctx.database.get(payload.body.database).modify(payload, ctx)
}