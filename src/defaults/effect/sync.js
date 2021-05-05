module.exports = async (user, req, model, result, body, method, ctx) => {
    let parsedModel = ctx.helpers.modelParser(body)
    ctx.model(parsedModel)
}