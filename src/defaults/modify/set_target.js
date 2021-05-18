module.exports = async function (payload) {
    let target = null
    if (payload.method == "post") {
        target = payload.model.model.build(payload.body)
    } else {
        let res = await payload.ctx.run({
            user: { system: true },
            model: payload.model.name,
            method: "get",
            query: payload.query
        })
        target = res.data
    }
    payload.target = target
}