module.exports = async function (payload) {
    let target = null
    if (payload.method == "post") {
        target = new payload.model.model(payload.body)
        console.log(target);
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