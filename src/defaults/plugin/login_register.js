module.exports = async function (ctx) {
    system_user =  ctx.models.get("system_user").model

    let adminCount = await system_admin.count()
    if (adminCount == 0) {
        let user = await system_user.create({ email: "admin", password: sha512("admin") })
        await system_admin.create({ system_user: user.id })
    }

    system_user.login = async({ body }) => {
        let { email, password } = body
        let user = await system_user.findOne({ where: { email, password: sha512(password) } })
        if (user instanceof system_user) {
            const token = jwt.sign({ id: user.id }, this.store.get("secret"));
            return token
        } else {
            return false
        }

    }
    system_user.register = async({ body }) => {
        let { email, password } = body
        let user = await system_user.findOne({ email, password: sha512(password) })
        if (user instanceof system_user) {
            return false
        } else {
            user = await system_user.create({ email, password: sha512(password) })
            return true
        }
    }
}