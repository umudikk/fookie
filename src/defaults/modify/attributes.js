module.exports = function ({ model, body, options, query }) {
    if (Array.isArray(options.attributes) && options.attributes.every(a => typeof a == "string")) {
        query.attributes = options.attributes
    } else {

    }
}