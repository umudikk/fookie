module.exports = async (user, req, model, response, body, method, ctx) => {
    let parsedModel = ctx.helpers.modelParser(body)
    ctx.model(parsedModel)
}