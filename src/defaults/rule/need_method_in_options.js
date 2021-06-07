module.exports = async function (payload) {
    return (payload.options.hasOwnProperty("method") && typeof payload.options.method == "string")

}