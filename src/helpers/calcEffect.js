module.exports = function (payload) {
    let arr = []
    arr.concat(payload.ctx.store.get("default_life_cycle_controls").effects[payload.method].before || [])
    arr.concat(payload.model.fookie[payload.method].effects || [])
    arr.concat(payload.ctx.store.get("default_life_cycle_controls").effects[payload.method].after || [])

    if (arr.every(e => payload.ctx.effects.has(e))) {
        arr.forEach((eff) => {
            payload.ctx.effects.get(eff)({ user, req, model, method, body, result, ctx })
        });
    } else {
        throw Error("Missing Effect")
    }
}