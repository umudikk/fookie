module.exports = async function({ user, req, body, model, query, method, ctx }) {
    if (user.id == undefined) return false
    let system_admin = ctx.models.get('system_admin').model
    let count = await system_admin.count({
        where: {
            system_user: user.id
        }
    })
    return count >= 1
}