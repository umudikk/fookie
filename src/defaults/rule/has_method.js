module.exports = async function (payload) {
    if (payload.hasOwnProperty("method") && typeof payload.method == 'string') {
        if (payload.ctx.models.get(payload.model).methods.has(payload.method)) {
            let method = payload.ctx.models.get(payload.model).methods.get(payload.method)
            if (typeof method == "function") {
                return true
            } else {
                payload.response.errors.push("Method must be function")
                return false
            }
        } else {
            payload.response.errors.push("Missing method:" + payload.method)
            return false
        }
    } else {
        payload.response.errors.push("Need method")
        return false
    }
}
