module.exports = async function ({ model, body }) {
    let search = [null, undefined]
    let keys = Object.keys(body)
    for (let key of keys) {
        if (model.schema[key].onlyClient) {
            if (search.includes(body[key])) {
                return false
            }
        }
    }
    return true
}