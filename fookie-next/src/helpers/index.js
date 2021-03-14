const http = require('http')

function hasFields(Model, body) {
    let fields = Object.keys(Model.fieldRawAttributesMap)
    let keys = Object.keys(body)
    return keys.every(key => fields.includes(key))
}

function response(status, data) {
    if (http.STATUS_CODES[String(status)]) {
        return {
            status,
            message: http.STATUS_CODES[String(status)],
            data
        }
    } else {
        return {
            status: 500,
            message: 'Invalid Status',
            data
        }
    }
}

function clear(document) {
    delete document.id
    delete document.updatedAt
    delete document.createdAt
    return document
}

module.exports.hasFields = hasFields
module.exports.response = response
module.exports.clear = clear