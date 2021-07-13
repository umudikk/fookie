module.exports = async function(ctx){
    ctx.model(require('./model/model.js'))
    ctx.modify("set_methods",require('./modify/set_methods.js'))
}