module.exports = function({ user, req, model, method, body, ctx }) {
    let roles = []
    console.log(roles);
    let keys = Object.keys(body)

    if (["post", "delete"].includes(method)) {
        roles = roles.concat(model.fookie[method].auth)
    }

    if (["post", "patch"].includes(method)) {
        roles = roles.concat(...keys.map(key => model.schema[key].write))
    }

    if (["get", "getAll"].includes(method)) {
        roles = roles.concat(...keys.map(key => model.schema[key].read))
    }

    console.log(roles);
    if (roles.every(e => ctx.effects.has(e))) {
        return roles.some((role) => { ctx.roles.get(role)({ user, req, model, method, body, ctx }) });
    }
}