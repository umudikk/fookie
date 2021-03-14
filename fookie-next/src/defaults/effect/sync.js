module.exports = async({ user, document, ctx }) => {
    console.log('SYNC ÇALIŞTI');
    let parsedModel = modelParser(document)
    this.model(parsedModel)
}