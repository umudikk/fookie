module.exports = async function({ user, ctx, model, body, method, result }) {
    let filters = model.fookie[method].filter || []
    if (["post", "getAll", "patch", "get", "schema"].includes(method)) filters.push("filter")
    if (filters.every(e => ctx.filters.has(e))) {
        for (let f of filters) {
            result = await ctx.filters.get(f)({ user, model, body, method, result, ctx })
        }
        return result

    } else {
        throw Error('Mssing filter')
    }
}