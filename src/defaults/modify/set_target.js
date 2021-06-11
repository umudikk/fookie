module.exports = async function (payload) {
    if (payload.method == "post") {
        payload.target = payload.ctx.models.get(payload.model).model(payload.body)
    } else {
        let res = await payload.ctx.run({
            user: { system: true },
            model: payload.model,
            method: "get",
            query: payload.query
        })
        payload.target = res.data
    }
}