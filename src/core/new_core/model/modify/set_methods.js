module.exports = async function (payload, ctx) {
    let set_methods = ctx.database.get(payload.body.database).set_methods
    set_methods(payload, ctx)
}