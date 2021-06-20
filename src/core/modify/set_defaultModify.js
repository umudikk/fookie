module.exports = function (payload) {
    let keys = Object.keys(payload.ctx.models.get(payload.model).schema)
    keys = keys.filter(k => payload.ctx.models.get(payload.model).schema[k].default)
    keys.forEach((k) => {
        let modify = payload.ctx.modifies.get(payload.ctx.models.get(payload.model).schema[k].default)
        if (body[k] == undefined) {
            body[k] = modify(payload)
        }

    })
}