module.exports = async function (ctx) {
    await ctx.run({
        system: true,
        model: "model",
        method: "post",
        body: require('./model/model.js')
    })
    await ctx.modify("set_methods", require('./modify/set_methods.js'))
}