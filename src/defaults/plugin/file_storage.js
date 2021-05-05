var multer = require('multer')

module.exports = async function (ctx) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

    ctx.upload = multer({ storage: storage })

    ctx.model({
        name: "system_file",
        display: "name",
        schema: {
            name: {
                type: "string",
                required: true
            },
            mimeType: {
                type: "string",
            },
            path: {
                type: "string",
            },
            byte: {
                type: "integer",
            }
        },
        fookie: {
            get: {
                role: ["system_admin"],
            },
            getAll: {
                role: ["system_admin"],
            },
            patch: {
                role: ["system_admin"],
                effect: ["form_data"]
            },
            post: {
                role: ["system_admin"],
                effect: ["form_data"]
            },
            delete: {
                role: ["system_admin"],
                effect: ["form_data"]
            },
            schema: {
                role: ["everybody"],
            }
        }
    })

    ctx.effect("form_data", function (payload) {
        payload.ctx.upload(payload.req, null, async function (err) {
            console.log(err);
        })
    })

}