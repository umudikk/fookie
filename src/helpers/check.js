module.exports = async function(payload) {
    let rules = payload.model.fookie[payload.method].rule || []

    if (payload.method == "post" || payload.method == "patch") {
        rules.push("has_fields")
        rules.push("check_type")    
    }
    if (payload.method == "post") {
        rules.push("check_required")
    }
    rules.push("check_auth")
    if (rules.every(i => payload.ctx.rules.has(i))) {
        let flag = true
        for (let i of rules) {
            let res = await payload.ctx.rules.get(i)(payload)
            if(!res) console.log(`You are not ${i}`);
            flag = flag && res
        }
        return flag
    } else {
        throw Error("Invalid Rule")
    }
}