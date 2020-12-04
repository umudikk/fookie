import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        auth: {
            get: ["everybody", "admin"],
            post: ["admin"],
            delete: ['admin'],
        }
    },
    mail: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["admin"],
            delete: ['admin'],
        }
    },
    password: {
        type: String,
        auth: {
            get: ["nobody"],
            post: ["admin"],
            delete: ['admin'],
        }
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

export default schema