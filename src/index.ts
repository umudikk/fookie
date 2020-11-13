import * as mongoose from 'mongoose'
import Parser from './Parse'
import Run from './Run'

const parser = new Parser()
const run = new Run()


export default class API {

    queryString
    connection;
    requester: any;
    models;
    roles;

    constructor(options) {
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
    }

    async connect(url: string = 'mongodb://localhost:27017/API', config: object = {}) {
        this.connection = await mongoose.connect(url, config)
        return this.connection

    }

    async parseRequester(req, res) {
        let user = await this.requester.findOne(req.body)
        return user != null ? { user } : false
    }

    async setRequester(model: mongoose.Schema<any>) {
        this.requester = model
    }

    async newRole(roleName: String, roleFunction: Function) {
        this.roles.set(roleName, roleFunction)
    }

    async setModel(modelName: string, schema: mongoose.Schema<any>) {
        let model = mongoose.model(name, schema);
        this.models.set(name, model)
    }








    async run(user, { rawLongQuery, method }) {
        let queryArray = []
        let url = parser.longUrl(rawLongQuery)

        url.forEach((str) => {
            let { modelName, rawQuery } = parser.url(str)
            queryArray[modelName] = parser.query(rawQuery)
        })
        console.log(queryArray);

    }




    async listen(port) {
        console.log(port + " listenin...");
    }
    async on(event, handler) {

    }
}