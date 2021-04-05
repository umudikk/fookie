module.exports = async function(payload) {
    let rules = payload.model.fookie[payload.method].rule || []

    if (payload.method == "post" || payload.method == "patch") {
        rules.push("has_fields")
    }
    if (payload.method == "post") {
        rules.push("check_required")
    }
    rules.push("check_auth")
    if (rules.every(i => payload.ctx.rules.has(i))) {
        let flag = true
        for (let i of rules) {
            flag = flag && await payload.ctx.rules.get(i)(payload)
            if (flag) return flag

        }

        return flag
    } else {
        throw Error("Invalid Rule")
    }
}