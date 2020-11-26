import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        auth: {
            get: ["everybody"],
            post: ["system"],
        }
    },
    items: [{
        type: Object,
        auth: {
            get: ["self"],
            post: ["system"],
        }
    }]
});

schema.methods.giveItem = function (data) {
    this.items.push(data)
}


export default schema

