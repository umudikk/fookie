module.exports = async function (payload) {
    let search = [null, undefined]
    let keys = Object.keys(payload.body)
    for (let key of keys) {
        if (payload.ctx.models.get(payload.model).schema[key].required) {
            if (search.includes(payload.body[key])) {
                return false
            }
        }
    }
    return true
}