import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["admin"],
            delete: ['admin'],
            patch: ['admin'],
        }
    },
    mail: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["admin"],
            delete: ['admin'],
            patch: ['admin'],
        }
    },
    password: {
        type: String,
        auth: {
            get: ["nobody"],
            post: ["admin"],
            delete: ['admin'],
            patch: ['nobody'],
        }
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

export default schema