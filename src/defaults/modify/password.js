const { sha512 } = require('js-sha512')

module.exports = function (payload) {
    console.log(payload.model.fookie);
    payload.target.password = sha512(payload.body.password)
}