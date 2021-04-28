module.exports = async function(payload) {
    let arr = []
    arr.concat(payload.ctx.store.get("default_life_cycle_controls").filters[payload.method].before || [])
    arr.concat(payload.model.fookie[payload.method].filters || [])
    arr.concat(payload.ctx.store.get("default_life_cycle_controls").filters[payload.method].after || [])

    if (arr.every(e => payload.ctx.filters.has(e))) {
        for (let f of arr) {
            await payload.ctx.filters.get(f)(payload)
        }
    } else {
        throw Error('Mssing filter')
    }
}