module.exports = function ({ response, ctx }) {
    ctx.models.forEach(model => {
        let tmp = {}
        for (let i in model) {
            if (i != "model") {
                tmp[i] = model[i]
            }
        }
        response.data.push(tmp)
    });
    return response.data
}