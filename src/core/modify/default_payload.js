module.exports = async function (payload) {
    payload.method = payload.hasOwnProperty("method") ? payload.method : ""
    payload.body = payload.hasOwnProperty("body") ? payload.body : {}
    payload.model = payload.hasOwnProperty("model") ? payload.model : ""
    payload.query = payload.hasOwnProperty("query") ? payload.query : { where: {} }
    payload.token = payload.hasOwnProperty("token") ? payload.token : ""
    payload.options = payload.hasOwnProperty("options") ? payload.options : {}
}