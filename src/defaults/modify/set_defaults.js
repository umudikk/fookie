module.exports = function ({ query, options }) {
    if (Array.isArray(options.show) && options.show.every(a => typeof a == "string")) {
        query.attributes = options.show
    } else {

    }
}