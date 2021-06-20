module.exports = async function (payload) {
    if (payload.target instanceof payload.ctx.models.get(payload.model).model) {
        return true
    } else {
        payload.response.status = 201
        payload.response.errors.push("there is no target")
        return false

    }
}