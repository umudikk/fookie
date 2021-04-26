module.exports = async function (payload) {
    let arr = []
    arr.concat(payload.ctx.store.get("default_life_cycle_controls").modifies[payload.method].before || [])
    arr.concat(payload.model.fookie[payload.method].modifies || [])
    arr.concat(payload.ctx.store.get("default_life_cycle_controls").modifies[payload.method].after || [])
    
    if (arr.every(e => payload.ctx.modifies.has(e))) {
        arr.forEach(async (m) => {
            await payload.ctx.modifies.get(m)({ user, model, method, body, ctx })
        });
    } else {
        throw Error('Mssing modify')
    }
}