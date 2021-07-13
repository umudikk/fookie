
module.exports = async function (payload, ctx) {
    ctx.databases.set("system", {
        connect: async function () {
            console.log("dont need")
        },
    })
    let model = ctx.models.get(payload.body.name)
    model.methods = new Map()



    model.methods.set("get", async function (payload, ctx) {
        return ctx[payload.model].get(payload.key)
    });
    model.methods.set("post", async function (payload, ctx) {
        ctx[payload.model].set(payload.key,payload.body)
        return payload.body
    });
    model.methods.set("delete", async function (payload, ctx) {
        ctx[payload.model].delete(payload.key)
    });
    model.methods.set("model", async function (payload, ctx) {
        return JSON.parse(JSON.stringify(model))
    });
    model.methods.set("size", async function (payload, ctx) {
        model.methods.size
    });
    model.methods.set("test", async function (payload, ctx) {
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

