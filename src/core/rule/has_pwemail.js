module.exports = function ({ body },ctx) {
    return (body.password != null && body.email != null)
}