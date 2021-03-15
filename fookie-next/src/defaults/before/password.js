module.exports = function({ user, method, model, body, ctx }) {
    if (body.password) {
        body.password = "CRIPTED PASSWORD"
    }
    return body
}