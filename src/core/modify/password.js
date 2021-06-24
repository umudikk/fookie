const { sha512 } = require("js-sha512");

module.exports = function (payload, ctx) {
   payload.body.password = sha512(payload.body.password);
};
