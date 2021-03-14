const findRequiredRoles = require('./requiredRoles')

module.exports = function({ user, req, body, model, method, ctx }) {
    let roles = findRequiredRoles(model, body, method)
    let rules = model.fookie[method].rule

    if (rules.every(i => ctx.rules.has(i)) && roles.every(i => ctx.roles.has(i))) {
        let hasAuth = roles.some(i => ctx.roles.get(i)({ user, req, body, model, method, ctx }))
        let isRulesOkey = rules.every(i => ctx.rules.get(i)({ user, req, body, model, method, ctx }))
        return hasAuth && isRulesOkey
    }
}