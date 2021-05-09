module.exports = async function (payload) {
    let arr = payload.ctx.helpers.defaultArrayCalc(payload, "filter")

    if (arr.every(e => payload.ctx.filters.has(e))) {
        for (let f of arr) {
            await payload.ctx.filters.get(f)(payload)
        }
    } else {
        throw Error('Mssing filter')
    }
}