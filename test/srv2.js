const Fookie = require("../src/")

let start = async function () {
    const api = new Fookie()
    await api.connect("postgres://postgres:123@localhost:5432/roleplay")
    await api.listen(7777)

}

start()