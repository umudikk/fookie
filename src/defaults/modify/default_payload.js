module.exports = async function (payload) {
    payload.query = payload.hasOwnProperty("query") ? payload.query : { where: {} }

}