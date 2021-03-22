module.exports = async function({ user, req, body, model, query, method, ctx }) {
    let system_admin = ctx.models.get('system_admin').model
    let count = await system_admin.count({
        where: {
            id: user.id || -1
        }
    })
    return count == 1
}