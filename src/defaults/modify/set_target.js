module.exports = async function (payload) {
    let target = null
    if (payload.method == "post") {
        target = new payload.ctx.models.get(payload.model).model(payload.body)
    } else {
        let res = await payload.ctx.run({
            user: { system: true },
            model: payload.model,
            method: "get",
            query: payload.query
        })
        target = res.data
    }
    payload.target = target
}