const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        read: ["everybody"],
        write: ["system"]
    },
    Inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        read: ["self"],
        write: ["system"],
    },
    mail: {
        type: String,
        read: ["self"],
        write: ["system"],
    },
    password: {
        type: String,
        read: ["system"],
        write: ["system"],
    },
});

module.exports = schema