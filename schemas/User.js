const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        auth: {
            read: ["everybody"],
            write: ["self"],
        }
    },
    Inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        auth: {
            read: ["self"],
            write: ["system"],
        }
    },
    mail: {
        type: String,
        auth: {
            read: ["self"],
            write: ["system"],
        }
    },
    password: {
        type: String,
        auth: {
            read: ["system"],
            write: ["system"],
        }
    },
});

module.exports = schema