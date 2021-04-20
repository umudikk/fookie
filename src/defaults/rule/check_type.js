var validate = require("validate.js");
module.exports = async function ({ user, req, model, query, method, body, ctx }) {
    let validators = ctx.store.get("validators")
    for (field of Object.keys(model.schema)) {
        let isValid = validate[validators[model.schema[field].type]](body[field])
        if(!isValid) return false
    }
    return true
}