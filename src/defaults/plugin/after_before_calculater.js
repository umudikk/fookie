module.exports = async function (ctx) {
    ctx.helpers.defaultArrayCalc = function (payload) {
        let arr = []
        try {
            arr.concat(payload.ctx.store.get("default_life_cycle_controls").modifies[payload.method].before)
        } catch (error) { }

        try {
            arr.concat(payload.model.fookie[payload.method].modifies)
        } catch (error) { }

        try {
            arr.concat(payload.ctx.store.get("default_life_cycle_controls").modifies[payload.method].after)
        } catch (error) { }
        return arr
    }
}