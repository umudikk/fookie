module.exports = async function ({ model, body}, ctx ) {
    let search = [null, undefined]
    let keys = ctx.lodash.keys(body)
    for (let key of keys) {

        if (ctx.models.get(model).schema[key].hasOwnProperty("onlyClient")) {
            if (search.includes(body[key])) {
                return false
            }
        }
    }
    return true
}