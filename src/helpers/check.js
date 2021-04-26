module.exports = async function (payload) {
    let rules = []
    rules.concat(payload.ctx.store.get("default_life_cycle_controls").rules[payload.method].before || [])
    rules.concat(payload.model.fookie[payload.method].rule || [])
    rules.concat(payload.ctx.store.get("default_life_cycle_controls").rules[payload.method].after || [])

    rules.push("check_auth")

    if (rules.every(i => payload.ctx.rules.has(i))) {
        let flag = true
        for (let i of rules) {
            let res = await payload.ctx.rules.get(i)(payload)
            flag = flag && res
        }
        return flag
    } else {
        throw Error("Invalid Rule")
    }
}