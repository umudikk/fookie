module.exports = async function({ user, method, model, result, body, ctx }) {
    if (result instanceof model.model) {
        result = result.toJSON()
    }
    let res = {}
    let keys = Object.keys(result)
    for (let key of keys) {
        let requiredRoles = model.schema[key] ? model.schema[key][body.method || "read"] || [] : []
        if (requiredRoles.every(i => ctx.roles.has(i))) {
            let auth = false
            for (let i of requiredRoles) {
                auth = (auth || await ctx.roles.get(i)({ user, method, model, result, body, ctx }))
            }

            if (requiredRoles.length == 0) auth = true
            if (auth) {

                res[key] = result[key]
            }
        } else {
            throw Error('Mssing Roles')
        }
    }
    return res
}