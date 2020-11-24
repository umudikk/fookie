import * as mongoose from 'mongoose'

const schema = new mongoose.Schema<IPlayer>({
    name:String,
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


 export interface IPlayer extends mongoose.Document {
    giveItem(data: any): void;
}

export default schema

