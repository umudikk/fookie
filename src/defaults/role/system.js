module.exports = async function ({ user, req, body, model, query, method, ctx }) {
    if (user == null || user == {} || user == undefined) return false
    if (user.hasOwnProperty("system") && typeof user.system == "boolean") {
        return user.system
    } else {
        return false
    }
}