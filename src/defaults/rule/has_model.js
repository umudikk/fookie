module.exports = async function (payload) {
    if (payload.hasOwnProperty("model") && typeof payload.model == 'string') {
        if (payload.ctx.models.has(payload.model)) {
            return true
        } else {
            payload.response.errors.push("Missing model"+ payload.model)
            return false
        }
    } else {
        payload.response.errors.push("Need model")
        return false
    }
}