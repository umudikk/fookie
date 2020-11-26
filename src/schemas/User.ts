import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["self"],
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