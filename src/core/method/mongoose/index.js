const mongooseModelParser = require("../../../helpers/mongooseModelParser")

module.exports = async function (model,ctx) {
    ctx.databases.set("mongoose" , {methods:new Map})

    ctx.databases.get("mongoose").methods.set("get", async function (payload, ctx) {
        let Model = mongooseModelParser(ctx.models.get(payload.model))
        let res = await Model.findOne(payload.query, payload.attributes, payload.projection);
        return res;
    });
    model.meth
    ctx.databases.get("mongoose").methods.set("getAll", async function (payload, ctx) {
        let Model = mongooseModelParser(ctx.models.get(payload.model))
        let res = await Model.find(payload.query, payload.attributes, payload.projection);
        return res;
    });
    ctx.databases.get("mongoose").methods.set("post", async function (payload, ctx) {
        let Model = mongooseModelParser(ctx.models.get(payload.model))
        let res = await Model.create(model);
        return res;
    });
    ctx.databases.get("mongoose").methods.set("delete", async function (payload, ctx) {
        let Model = mongooseModelParser(ctx.models.get(payload.model))
        let res = await Model.deleteMany(payload.query);
        return res;
    });
    ctx.databases.get("mongoose").methods.set("patch", async function (payload, ctx) {
        let Model = mongooseModelParser(ctx.models.get(payload.model))
        return await Model.updateMany(payload.query, model);
    });
    ctx.databases.get("mongoose").methods.set("model", async function (payload, ctx) {
        return JSON.parse(JSON.stringify(model))
    });
    ctx.databases.get("mongoose").methods.set("count", async function (payload, ctx) {
        let Model = mongooseModelParser(ctx.models.get(payload.model))
        let res = await Model.countDocuments(payload.query);
        return res;
    });

    ctx.databases.get("mongoose").methods.set("test", async function (payload, ctx) {
        payload.method = payload.options.method + '';
        payload.options.simplified = false
        for (let b of ctx.store.get("befores")) {
            await ctx.modifies.get(b)(payload, ctx);
        }
        if (await preRule(payload, ctx)) {
            await modify(payload, ctx);
            if (await rule(payload, ctx)) {
                return true;
            }
        }
        return false;
    });
}

