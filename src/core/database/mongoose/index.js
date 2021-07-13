const mongooseModelParser = require("../../../helpers/mongooseModelParser")

module.exports = async function (payload,ctx) {
    ctx.databases.set("mongodb" , {
        connect:async function(){
            console.log("connect mongo")
        },
    })
    let model = payload.body
    model.methods = new Map()

    let Model = mongooseModelParser(payload.body)

    model.methods.set("get", async function (_payload, ctx) {        
        let res = await Model.findOne(_payload.query, _payload.attributes, _payload.projection);
        return res;
    });
    model.methods.set("getAll", async function (_payload, ctx) {
        let res = await Model.find(_payload.query, _payload.attributes, _payload.projection);
        return res;
    });
    model.methods.set("post", async function (_payload, ctx) {
        let res = await Model.create(model);
        return res;
    });
    model.methods.set("delete", async function (_payload, ctx) {
        let res = await Model.deleteMany(_payload.query);
        return res;
    });
    model.methods.set("patch", async function (_payload, ctx) {
        return await Model.updateMany(_payload.query, model);
    });
    model.methods.set("model", async function (_payload, ctx) {
        return JSON.parse(JSON.stringify(model))
    });
    model.methods.set("count", async function (_payload, ctx) {
        let res = await Model.countDocuments(_payload.query);
        return res;
    });

    model.methods.set("test", async function (_payload, ctx) {
        _payload.method = _payload.options.method + '';
        _payload.options.simplified = false
        for (let b of ctx.store.get("befores")) {
            await ctx.modifies.get(b)(_payload, ctx);
        }
        if (await preRule(_payload, ctx)) {
            await modify(_payload, ctx);
            if (await rule(_payload, ctx)) {
                return true;
            }
        }
        return false;
    });
}

