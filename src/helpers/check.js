module.exports = async function(payload) {
    let rules = payload.model.fookie[payload.method].rule || []
    rules.push("check_auth")
    if (payload.method == "post" || payload.method == "patch") {
        rules.push("has_fields")
    }
    if (payload.method == "post") {
        rules.push("check_required")
    }
    console.log(rules);
    if (rules.every(i => payload.ctx.rules.has(i))) {
        let flag = true
        for (let i of rules) {
            console.log(i);
            flag = flag && await payload.ctx.rules.get(i)(payload)

        }

        return flag
    } else {
        throw Error("Invalid Rule")
    }
}