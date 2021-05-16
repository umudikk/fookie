module.exports = async function (payload) {
    let res = await payload.ctx.run({
        user: { system: true },
        model: payload.model.name,
        method: "get",
        query: payload.query
    })
    payload.target = res.data
}