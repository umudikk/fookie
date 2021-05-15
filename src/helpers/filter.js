module.exports = async function ({ user, method, model, response, body, ctx }) {
    let keys = []
    if (response.data instanceof model.model) keys = Object.keys(response.data.toJSON())
    else keys = Object.keys(response.data)

    for (let key of keys) {
        let requiredRoles = model.schema[key] ? model.schema[key][body.method || "read"] || [] : []

        if (requiredRoles.every(i => ctx.roles.has(i))) {
            let auth = false
            for (let i of requiredRoles) {
                auth = (auth || await ctx.roles.get(i)({ user, method, model, response, body, ctx }))
            }
            if (requiredRoles.length == 0) auth = true
            if (!auth) {
                response.data[key] = undefined
            }
        } else {
            throw Error('Mssing Roles')
        }
    }
}