module.exports = function ({ body }) {
    return (body.password != null && body.email != null)
}