module.exports = async function({ user, req, model, method, result, ctx }) {
    let effs = model.fookie[method].effect
    if (effs.every(e => ctx.effects.has(e))) {
        effs.forEach(async(eff) => {
            ctx.effects.get(eff)({ user, model, method, result, ctx })
        });
    }
}