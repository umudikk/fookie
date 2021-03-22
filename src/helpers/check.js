const findRequiredRoles = require('./requiredRoles')
module.exports = function(payload) {
    let rules = payload.model.fookie[payload.method].rule || []
    rules.push("check_auth")
    if (payload.method == "post" || payload.method == "patch") {
        rules.push("has_fields")
    }
    if (rules.every(i => payload.ctx.rules.has(i))) {
        return rules.every(async function(i) { return await payload.ctx.rules.get(i)(payload) })
    } else {
        throw Error('Missing role or rule')
    }
}