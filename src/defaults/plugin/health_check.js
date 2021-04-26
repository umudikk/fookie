module.exports = async function (ctx) {
    ctx.app.get("health_check", (req, res) => {
        res.status(200).json({ ok: true })
    })
}