module.exports = async function ({ model, body }, ctx) {
    let keys = ctx.lodash.keys(body)
    for (let key of keys) {
        if (ctx.models.get(model).schema[key].hasOwnProperty("onlyClient")) {
            if (ctx.lodash.isNull(body[key])) {
                return false
            }
        }
    }
    return true
}