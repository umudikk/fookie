module.exports = async function (payload) {
    let rules = payload.ctx.helpers.defaultArrayCalc(payload, "rule")

    if (rules.every(i => payload.ctx.rules.has(i))) {
        let flag = true
        for (let i of rules) {
            let res = await payload.ctx.rules.get(i)(payload)
            if (!res) {
                payload.response.errors.push(`false rule: ${i}`)
                return false
            }
            flag = flag && res
        }
        return flag
    } else {
        throw Error("Invalid Rule")
    }
}