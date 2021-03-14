const findRequiredRoles = require('./requiredRoles')

module.exports = function({ user, req, body, model, method, ctx }) {
    let rules = model.fookie[method].rule || []

    if (method == "get") {
        rules.push("check_auth")
    }

    if (method == "getAll") {
        rules.push("check_auth")
    }

    if (method == "post") {
        rules.push("has_fields")
        rules.push("check_auth")
    }

    if (method == "patch") {
        rules.push("has_fields")
        rules.push("check_auth")
    }

    if (rules.every(i => ctx.rules.has(i))) {
        let isRulesOkey = rules.every(i => ctx.rules.get(i)({ user, req, body, model, method, ctx }))
        return isRulesOkey
    } else {
        throw Error('Missing role or rule')
    }
}