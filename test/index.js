const Fookie = require('../src/index')
const fookie = new Fookie()

let start = async function () {
    await fookie.connect('mongodb://localhost/fookie')
    fookie.listen(666)
}
start()