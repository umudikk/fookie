
import * as mongoose from 'mongoose'

async function main() {
    mongoose.connect('mongodb://localhost:27017/test')

    let schema = new mongoose.Schema({
        name: String
    })

    let model = mongoose.model('model', schema)

    let user = new model({
        name: 'umut'
    })

    let res = await user.save()

    console.log(res);

}

main()

