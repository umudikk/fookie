const filter = require("../../helpers/filter")
module.exports = async function ({ user, method, model, result, body, ctx }) {
    if (Array.isArray(result)) {
        let arr = []
        for (let r of result) {
            arr.push(await filter({ user, method, model, result: r, body, ctx }))
        }
        result = arr
    } else {
        result = await filter({ user, method, model, result, body, ctx })
    }
}