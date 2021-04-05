module.exports = function({ user, req, model, body, method, result, ctx }) {
    return Object.keys(body).every(k => Object.keys(model.schema).includes(k))
}