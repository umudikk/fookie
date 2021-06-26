module.exports = function ({ model, attributes }) {
    if (attributes && typeof attributes == "string") {
        return ctx.lodash.keys(attributes.split(" ")).every(k => ctx.lodash.keys(model.schema).includes(k))
    } else {
        return true
    }
}