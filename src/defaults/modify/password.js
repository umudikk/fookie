const { sha512 } = require('js-sha512')

module.exports = function({ user, method, model, body,target, ctx }) {
    target.password = sha512(body.password)
}