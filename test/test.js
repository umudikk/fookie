const Fookie = require('../src')
const fookie = new Fookie()

let start = async function () {
    await fookie.connect('mongodb://localhost/fookie')
    fookie.listen(3000)
}
start()