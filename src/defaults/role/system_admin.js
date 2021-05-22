module.exports = async function ({ user, ctx, model }) {
    if (user._id == undefined) return false
    let res = await ctx.run({
        user: { system: true },
        model: "system_admin",
        method: "count",
        query: {
            where: {
                system_user: user._id
            }
        }
    })
    let count = res.data
    return count >= 1
}