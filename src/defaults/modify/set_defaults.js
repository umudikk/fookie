module.exports = function (payload) {
    let keys = Object.keys(payload.model.schema)
    keys = keys.filter(k => payload.model.schema[k].default)
    keys.forEach((k) => {
        let modify = payload.ctx.modifies.get(payload.model.schema[k].default)
        body[k] = modify(payload)
    })
}