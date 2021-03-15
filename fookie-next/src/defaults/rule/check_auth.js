module.exports = function({ user, req, model, method, body, ctx }) {
    let roles = []
    let keys = Object.keys(body)

    if (["post", "delete", "get", "getAll"].includes(method)) {
        roles = roles.concat(model.fookie[method].auth)
    }
    if (["post", "patch"].includes(method)) {
        roles = roles.concat(...keys.map(key => model.schema[key].write))
    }

    if (roles.every(e => ctx.roles.has(e))) {
        let res = roles.some(role => ctx.roles.get(role)({ user, req, model, method, body, ctx }));
        return res
    } else {
        throw Error('Missing role')
    }
}