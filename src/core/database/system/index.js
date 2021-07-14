
module.exports = async function (ctx) {
    ctx.databases.set("system", {
        connect: async function () {
            console.log("dont need")
        },
        modify: async function (payload, ctx) {
            payload.body.methods = new Map()
            payload.body.methods.set("get", async function (payload, ctx) {
                return ctx[payload.model].get(payload.key)
            });
            payload.body.methods.set("post", async function (payload, ctx) {
                ctx[payload.model].set(payload.key, payload.body)
                return payload.body
            });
            payload.body.methods.set("delete", async function (payload, ctx) {
                ctx[payload.model].delete(payload.key)
            });
            payload.body.methods.set("model", async function (payload, ctx) {
                return JSON.parse(JSON.stringify(model))
            });
            payload.body.methods.set("size", async function (payload, ctx) {
                payload.body.methods.size
            });
            payload.body.methods.set("test", async function (payload, ctx) {
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
    })
    

}

