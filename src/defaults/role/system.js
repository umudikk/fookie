module.exports = function({ user, req, body, model, query, method, ctx }) {
    return user.system || false
}