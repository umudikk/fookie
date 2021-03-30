module.exports = async function({ user, req, model, query, method, body, ctx }) {
    let search = ["", null, undefined]
    let keys = Object.keys(model.schema)
    for (let key of keys) {
        if (model.schema[key].required) {
            if (search.includes(body[key])) {
                return false
            }
        }
    }
    return true
}