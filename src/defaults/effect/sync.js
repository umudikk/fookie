module.exports = async({ user, document, ctx }) => {
    let parsedModel = ctx.helpers.modelParser(document)
    ctx.model(parsedModel)
}