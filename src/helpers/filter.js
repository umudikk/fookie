module.exports = function({ user, method, model, result, body, ctx }) {
    if (result instanceof model.model) {
        result = result.toJSON()
    }
    let doc = ctx.helpers.clear(result)
    let res = {}
    let keys = Object.keys(doc)
    for (let key of keys) {
        doc[key] = result[key]
        let requiredRoles = ctx.helpers.findRequiredRoles(model, key, body.method || "read")

        if (requiredRoles.every(i => ctx.roles.has(i))) {
            let auth = requiredRoles.some(function(i) {
                return ctx.roles.get(i)({ user, method, model, result, body, ctx })
            })
            if (requiredRoles.length == 0) auth = true
            if (auth) {
                res[key] = result[key]
            }
        } else {
            throw Error('Mssing Roles')
        }
    }
    res.updatedAt = result.updatedAt || "-"
    res.createdAt = result.createdAt || "-"
    res.id = result.id || -1
    return res
}