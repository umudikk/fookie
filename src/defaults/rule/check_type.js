var validate = require("validate.js");

let validators = {
    float: "isNumber",
    boolean: "isBoolean",
    string: "isString",
    number: "isNumber",
    integer: "isInteger",
    jsonb: "isObject",
    json: "isObject",
    object:"isObject",
    date: "isDate",
    time: "isTime"
}
module.exports = async function ({ model, response, body, ctx }) {
    for (field of Object.keys(body)) {
        let isValid = false
        if (typeof model.schema[field].relation == "string") {
            isValid = true
        } else {
            isValid = await validate[validators[model.schema[field].type]](body[field])
        }
        if (!isValid) {
            response.errors.push(`[Check_Type] Invalid type: ${model.schema[field].type}`)
            response.errors.push(`[Check_Type] Invalid value: ${body[field]}`)
            return false
        }

    }
    return true
}