module.exports = function (payload) {
    let keys = Object.keys(payload.model.schema)
    keys = keys.filter(k => payload.model.schema[k].default)
    keys.forEach((k) => {
        if (payload.body[k] == undefined) {
            payload.body[k] = payload.model.schema[k].default
        }
    })
}