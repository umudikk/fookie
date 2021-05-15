module.exports = function({ model, body }) {
    return Object.keys(body).every(k => Object.keys(model.schema).includes(k))
}