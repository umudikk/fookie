module.exports = async function({ user, ctx, req, model, body, method, result }) {
    let filters = model.fookie[method].filter || []
    if (["post", "getAll", "patch", "get", "schema"].includes(method)) filters.push("filter")
    if (filters.every(e => ctx.filters.has(e))) {
        for (let f of filters) {
            await ctx.filters.get(f)({ user, model, req, body, method, result, ctx })
        }
    } else {
        throw Error('Mssing filter')
    }
}