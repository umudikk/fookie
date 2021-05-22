module.exports = async function (payload) {
    if (payload.target instanceof payload.model.model) {
        return true
    } else {
        payload.response.status = 201
        return false

    }
}