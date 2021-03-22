module.exports = function({ user, ctx, model, body, method, result }) {
    let filters = model.fookie[method].filter || []
    if (["post", "getAll", "patch", "get", "options"].includes(method)) filters.push("filter")

    if (filters.every(e => ctx.filters.has(e))) {
        let res = result
        filters.forEach(m => {
            res = ctx.filters.get(m)({ user, model, body, method, result: res, ctx })
        });
        return res
    } else {
        throw Error('Mssing filter')
    }
}