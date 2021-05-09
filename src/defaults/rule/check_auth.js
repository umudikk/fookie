module.exports = async function (payload) {
    if (payload.user.system == true) { return true }

    let roles = []   

    roles = roles.concat(payload.ctx.helpers.defaultArrayCalc(payload,"role"))

    let keys = Object.keys(payload.body)
    if (["post", "patch"].includes(payload.method)) {
        roles = roles.concat(...keys.map(key => payload.model.schema[key].write != undefined ? payload.model.schema[key].write : []))
    }
    if (roles.length == 0) return true

    if (roles.every(e => payload.ctx.roles.has(e))) {
        for (let role of roles) {
            let res = await payload.ctx.roles.get(role)(payload)
            if (res) {
                return true
            }

            let modifies = []
            try {
                modifies = payload.model.fookie[payload.method].reject[role]
            } catch (error) { }
            await Promise.all(modifies.map(m => payload.ctx.modifies.get(m)(payload)))

        }
        return false
    } else {
        throw Error('Missing role')
    }

}