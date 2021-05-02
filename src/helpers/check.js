module.exports = async function (payload) {
    let rules = payload.ctx.helpers.defaultArrayCalc(payload)

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