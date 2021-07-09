module.exports = async function ({ model, attributes },ctx) {
    if (attributes && ctx.lodash.isArray(attributes)) {
        return attributes.every(k => ctx.lodash.keys(model.schema).includes(k))
    } else {
        return true
    }
}