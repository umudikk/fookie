import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["admin"],
        }
    },
    mail: {
        type: String,
        auth: {
            get: ["self"],
            post: ["admin"],
        }
    },
    password: {
        type: String,
        auth: {
            get: ["nobody"],
            post: ["admin"],
        }
    },
});

export default schema