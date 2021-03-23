"use-strick"
module.exports = async function({ user, method, model, result, body, ctx }) {
    let keys = []
    if (result instanceof model.model) keys = Object.keys(result.toJSON())
    else keys = Object.keys(result)

    for (let key of keys) {
        let requiredRoles = model.schema[key] ? model.schema[key][body.method || "read"] || [] : []
        if (requiredRoles.every(i => ctx.roles.has(i))) {
            let auth = false
            for (let i of requiredRoles) {
                auth = (auth || await ctx.roles.get(i)({ user, method, model, result, body, ctx }))
            }
            if (requiredRoles.length == 0) auth = true
            if (!auth) {
                result[key] = undefined
            }
        } else {
            throw Error('Mssing Roles')
        }
    }
}