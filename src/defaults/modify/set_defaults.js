module.exports = function ({ model, body }) {
    let keys = Object.keys(model.schema)
    keys = keys.filter(k => model.schema[k].default)
    console.log("set defaults");
    keys.forEach((k) => {
        body[k] = model.schema[k].default
    })
}