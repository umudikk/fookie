module.exports = function ({ model, attributes }) {
    if (attributes && typeof attributes == "string") {
        return Object.keys(attributes.split(" ")).every(k => Object.keys(model.schema).includes(k))
    } else {
        return true
    }
}