module.exports = function ({ user, req, model, method, body, result, ctx }) {
    let effs = model.fookie[method].effect || []
    if (effs.every(e => ctx.effects.has(e))) {
        effs.forEach((eff) => {
            ctx.effects.get(eff)({ user, req, model, method, body, result, ctx })
        });
    } else {
        throw Error("Missing Effect")
    }
}