module.exports = function({ user, ctx, model, method, result }) {
    let effs = model.fookie[method].modify
    if (effs.every(e => ctx.effects.has(e))) {
        let res = result
        effs.forEach(async(eff) => {
            res = ctx.effects.get(eff)({ user, model, method, res, ctx })
        });
        return res
    }
}