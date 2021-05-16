var validate = require("validate.js");

module.exports = async function ({ model, response, body, ctx }) {
    let validators = ctx.store.get("validators")
    for (field of Object.keys(body)) {
        
        let isValid = await validate[validators[model.schema[field].type]](body[field])
        if (!isValid) {
            console.log(field);
            console.log("err");
            response.errors.push(`[Check_Type] Invalid type: ${model.schema[field].type}`)
            return false
        }

    }
    return true
}