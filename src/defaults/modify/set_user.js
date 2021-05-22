const jwt = require('jsonwebtoken')
module.exports = async function (payload) {
    jwt.verify(payload.token, payload.ctx.store.get("secret"), async (err, parsed) => {
        if (!err) {
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
    });
}