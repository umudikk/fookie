module.exports = function({ user, ctx, model, method, result }) {

    let modifies = model.fookie[method].modify || []

    if (["post", "getAll", "patch", "get", "options"].includes(method)) {
        modifies.push("filter")
    }

    if (modifies.every(e => ctx.modifies.has(e))) {
        let res = result
        modifies.forEach(async(m) => {
            res = ctx.modifies.get(m)({ user, model, method, result: res, ctx })
        });
        return res
    } else {
        throw Error('Mssing modify')
    }
}