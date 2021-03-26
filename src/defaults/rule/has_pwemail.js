module.exports = function({ user, req, body, model, method, result, ctx }) {
    return (body.password != null && body.email != null)
}