const jwt = require('jsonwebtoken')
module.exports = async function (payload) {
    if (payload.user.hasOwnProperty('system')) return payload.user.system
    if (payload.hasOwnProperty("user")) return
    let parsed = false
    try {
        parsed = jwt.verify(payload.token, payload.ctx.store.get("secret"))
    } catch (error) {
        payload.response.errors.push("invalid token")
    }


    let userResponse = await payload.ctx.run({
        user: { system: true },
        model: "system_user",
        method: "get",
        query: {
            where: {
                _id: parsed._id
            }
        }
    })

    if (userResponse.status == 200) {
        payload.user = userResponse.data
    } else {
        payload.user = {}
    }
}