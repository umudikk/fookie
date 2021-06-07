module.exports = function (payload) {
    let keys = Object.keys(payload.ctx.models.get(payload.model).schema)
    keys = keys.filter(k => payload.ctx.models.get(payload.model).schema[k].default)
    keys.forEach((k) => {
        if (payload.body[k] == undefined) {
            payload.body[k] = payload.ctx.models.get(payload.model).schema[k].default
        }
    })
}