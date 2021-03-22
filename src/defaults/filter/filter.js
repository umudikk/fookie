const filter = require("../../helpers/filter")
module.exports = function({ user, method, model, result, body, ctx }) {
    if (Array.isArray(result)) {
        let arr = []
        for (let r of result) {
            arr.push(filter({ user, method, model, result: r, body, ctx }))
        }
        return arr
    } else {
        return filter({ user, method, model, result, body, ctx })
    }
}