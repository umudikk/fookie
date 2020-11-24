import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["self"],
        }
    },
    Inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        auth: {
            get: ["self"],
            post: ["system"],
        }
    },
    mail: {
        type: String,
        auth: {
            get: ["self"],
            post: ["system"],
        }
    },
    password: {
        type: String,
        auth: {
            get: ["nobody"],
            post: ["system"],
        }
    },
});

export default schema