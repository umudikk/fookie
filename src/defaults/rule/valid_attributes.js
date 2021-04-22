module.exports = function ({ user, req, model, body, method, options, result, ctx }) {
    if (options.attributes && Array.isArray(options.attributes) && options.attributes.every(a => typeof a == "string")) {
        return Object.keys(options.attributes).every(k => Object.keys(model.schema).includes(k))
    } else {
        return true
    }
}