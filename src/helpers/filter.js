module.exports = async function ({ user, method, model,  body, ctx }, singleData) {
    let keys = []
    if (singleData instanceof model.model) keys = Object.keys(singleData)
    else keys = Object.keys(singleData)
    for (let key of keys) {
        let requiredRoles = model.schema[key] ? model.schema[key][body.method || "read"] || [] : []

        if (requiredRoles.every(i => ctx.roles.has(i))) {
            let auth = false
            for (let i of requiredRoles) {
                auth = (auth || await ctx.roles.get(i)({ user, method, model, response, body, ctx }))
            }
            if (requiredRoles.length == 0) auth = true
            if (!auth) {
                singleData[key] = undefined
            }
        } else {
            throw Error('Mssing Roles')
        }
    }
}