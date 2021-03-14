module.exports = function({ user, ctx, model, method, result }) {
    let effs = model.fookie[method].modify
    if (effs.every(e => ctx.effects.has(e))) {
        effs.forEach(async(eff) => {
            let res = result
            res = ctx.effects.get(eff)({ user, model, method, res, ctx })
        });
    }
}