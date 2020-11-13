import * as mongoose from 'mongoose'

export default class Run {
    constructor() {

    }

    async controlAuth(User: mongoose.Document, Model: mongoose.Model<any>, field: String) {
        return true
    }


    filter(user: mongoose.Document, Model: mongoose.Model<any>, roleFunc: Function, model: mongoose.Document, method: string): mongoose.Document {
        let paths = Model.prototype.schema.paths
        for (let i in paths) {
            if (!roleFunc(user, model)) {
                model[i] = undefined
            }
        }
        return model
    }


}