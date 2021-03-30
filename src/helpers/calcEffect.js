module.exports = async function({ user, req, model, method, body, result, ctx }) {
    let effs = model.fookie[method].effect || []
    if (effs.every(e => ctx.effects.has(e))) {
        effs.forEach(async(eff) => {
            await ctx.effects.get(eff)({ user, req, model, method, body, result, ctx })
        });
    } else {
        throw Error("Missing Effect")
    }
}