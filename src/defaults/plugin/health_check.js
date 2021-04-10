module.exports = async function (ctx) {
    ctx.app.get("health", (req, res) => {
        res.status(200).json({ ok: true })
    })
}