module.exports = function ({ model, body }) {
    let res = Object.keys(body).every(k => Object.keys(model.schema).includes(k))
    return res
}