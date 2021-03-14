const fookie = require("../src/index")

let start = async function() {
    const api = new fookie({})
    await api.connect("postgres://postgres:123@127.0.0.1:5432/roleplay")

    api.role("admin", (user, document, ctx) => {
        return user.type == "admin"
    })

    api.effect("log", (user, doc, ctx) => {
        console.log("log");
    })

    api.effect("a", (user, doc, ctx) => {
        console.log("a");
    })

    api.effect("b", (user, doc, ctx) => {
        console.log("b");
    })

    api.routine("backup", 1000 * 60, (ctx) => {
        console.log("backup");
    })

    api.listen(7777)
}

start()