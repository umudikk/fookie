module.exports = async function (ctx) {
    ctx.helpers.defaultArrayCalc = function (payload, mapName) {
        let arr = []

        try {
            arr = arr.concat(payload.ctx.store.get("default_life_cycle_controls")[payload.method][mapName].before)
        } catch (error) { }

        try {
            arr = arr.concat(payload.ctx.models.get(payload.model).fookie[payload.method][mapName])
        } catch (error) { }
        try {
            arr = arr.concat(payload.ctx.store.get("default_life_cycle_controls")[payload.method][mapName].after)
        } catch (error) { }

        return arr.filter(item => item != undefined)
    }
}