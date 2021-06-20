module.exports = async function (payload) {
    let search = ["", null, undefined]
    let model = payload.ctx.models.get(payload.model)
    let keys = Object.keys(model.schema)
    for (let key of keys) {
        if (model.schema[key].required) {
            if (search.includes(payload.body[key])) {
                return false
            }
        }
    }
    return true
}