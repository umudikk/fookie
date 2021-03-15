module.exports = function({ user, method, model, result, ctx }) {
    if (Array.isArray(result)) {
        if (result.every(d => d instanceof model.model)) result = result.map(r => r.toJSON())
        let arr = []
        for (let r of result) {
            let doc = ctx.helpers.clear(r)
            let res = {}
            let keys = Object.keys(doc)
            for (let key of keys) {
                doc[key] = r[key]
                let requiredRoles = ctx.helpers.findRequiredRoles(model, key, "read")
                if (requiredRoles.every(i => ctx.roles.has(i))) {
                    let auth = requiredRoles.some(i => ctx.roles.get(i)(user, this))
                    if (auth) {
                        res[key] = r[key]
                    }
                } else {
                    throw Error('Mssing Roles')
                }
            }
            res.updatedAt = r.updatedAt
            res.createdAt = r.createdAt
            res.id = r.id
            arr.push(res)
        }
        return arr
    } else {
        if (result instanceof model.model) result = result.toJSON()

        let doc = ctx.helpers.clear(result)
        let res = {}
        let keys = Object.keys(doc)
        for (let key of keys) {
            doc[key] = result[key]
            let requiredRoles = ctx.helpers.findRequiredRoles(model, key, "read")
            if (requiredRoles.every(i => ctx.roles.has(i))) {
                let auth = requiredRoles.some(i => ctx.roles.get(i)(user, this))
                if (auth) {
                    res[key] = result[key]
                }
            } else {
                throw Error('Mssing Roles')
            }
        }
        res.updatedAt = result.updatedAt
        res.createdAt = result.createdAt
        res.id = result.id
        return res
    }
}