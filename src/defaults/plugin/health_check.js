module.exports = async function (ctx) {
    ctx.app.get("health", (req, res) => {
        res.json({ ok: true })
    })
}