module.exports = async function ({ user, req, model, query, method, body, ctx }) {
    if (user.system) {
        return true
    }
    let roles = []
    let keys = Object.keys(body)

    roles = roles.concat(model.fookie[method].role || [])

    if (["post", "patch"].includes(method)) {
        roles = roles.concat(...keys.map(key => model.schema[key].write) || [])
    }

    if (roles.length == 0) return true
    else {
        if (roles.every(e => ctx.roles.has(e))) {
            let auth = false
            for (let role of roles) {
                auth = auth || await ctx.roles.get(role)({ user, req, model, query, method, body, ctx })
            }
            return auth
        } else {
            throw Error('Missing role')
        }
    }
}