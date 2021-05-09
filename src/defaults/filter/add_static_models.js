module.exports = function ({ user, method, model, result, ctx }) {
    ctx.models.forEach(model => {
        let tmp = {}
        for (let i in model) {
            if (i != "model") {
                tmp[i] = model[i]
            }
        }
        result.push(tmp)
    });
    return result
}