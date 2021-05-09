module.exports = async function (payload) {
    let arr = payload.ctx.helpers.defaultArrayCalc(payload, "modifiy")
    if (arr.every(e => payload.ctx.modifies.has(e))) {
        arr.forEach(async (m) => {
            await payload.ctx.modifies.get(m)(payload)
        });
    } else {
        throw Error('Mssing modify')
    }
}