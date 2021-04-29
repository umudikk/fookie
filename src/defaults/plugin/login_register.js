const jwt = require("jsonwebtoken")
const { sha512 } = require("js-sha512")

module.exports = async function(ctx) {
    let system_user = ctx.models.get("system_user")
    let system_admin = ctx.models.get("system_admin")

    let adminCount = await system_admin.model.count({})
    if (adminCount == 0) {
        let user = await system_user.model.create({ email: "admin", password: sha512("admin") })
        await system_admin.model.create({ system_user: user.id })
    }

    system_user.methods.set("login", async({ body }) => {
        let { email, password } = body
        let user = await system_user.model.findOne({ where: { email, password: sha512(password) } })
        if (user instanceof system_user.model) {
            const token = jwt.sign({ id: user.id }, ctx.store.get("secret"));
            return token
        } else {
            return false
        }
    })

    system_user.methods.set("register", async({ body }) => {
        let { email, password } = body
        let user = await system_user.model.findOne({ email, password: sha512(password) })
        if (user instanceof system_user.model) {
            return false
        } else {
            user = await system_user.model.create({ email, password: sha512(password) })
            return true
        }
    })

}