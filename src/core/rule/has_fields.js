module.exports = function (payload) {
    return Object.keys(payload.body).every(k => Object.keys(payload.ctx.models.get(payload.model).schema).includes(k))
}