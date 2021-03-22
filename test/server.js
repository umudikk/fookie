const Fookie = require("../src/index")

let start = async function() {
    const api = new Fookie()
    await api.connect("postgres://postgres:123@127.0.0.1:5432/roleplay")

    api.set((ctx) => {
        let User = ctx.models.get("system_user")
        User.model.random = ({ user, query, body }) => {
            return Math.random()
        }

        ctx.store.set("login", true)
        ctx.store.set("register", true)
        ctx.store.set("secret", "secret")

    })
    api.listen(7777)
}

start()