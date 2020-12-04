import * as mongoose from 'mongoose'

const schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        auth: {
            get: ["everybody"],
            post: ["admin"],
        }
    },
    items: [{
        type: Object,
        auth: {
            get: ["self"],
            post: ["system"],
        }
    }]
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

schema.methods.giveItem = function (data) {
    this.items.push(data)
}


export default schema

