module.exports = function({ user, ctx, body, model, method }) {
    let befores = model.fookie[method].before || []
    if (befores.every(e => ctx.befores.has(e))) {
        let res = body
        befores.forEach(async(b) => {
            res = ctx.befores.get(b)({ user, model, method, body, ctx })
        });
        return res
    } else {
        throw Error('Mssing before')
    }
}