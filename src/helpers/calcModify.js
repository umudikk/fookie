module.exports = async function({ user, ctx, body, model, method }) {
    let modifies = model.fookie[method].modify || []
    if (modifies.every(e => ctx.modifies.has(e))) {
        modifies.forEach(async(m) => {
            await ctx.modifies.get(m)({ user, model, method, body, ctx })
        });
    } else {
        throw Error('Mssing modify')
    }
}