module.exports = function({ user, method, model, document, ctx }) {
    let doc = ctx.helpers.clear(document.toJSON())
    let res = {}
    let keys = Object.keys(document)

    for (let key of keys) {
        doc[key] = document[key]
        let requiredRoles = ctx.helpers.findRequiredRoles(model, doc, method)
        if (requiredRoles.every(i => ctx.roles.has(i))) {
            let auth = requiredRoles.some(i => ctx.roles.get(i)(user, this))
            if (auth) {
                res[key] = document[key]
            }
        } else {
            return "hepsi yok"
        }
    }
    res.updatedAt = document.updatedAt
    res.createdAt = document.createdAt
    res.id = document.id
    return res
}