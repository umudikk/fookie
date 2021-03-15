module.exports = function(model, key, selector) {
    if (model.schema[key]) {
        return model.schema[key][selector]
    } else {
        throw Error("Invalid Schema")
    }
}