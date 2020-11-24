import * as mongoose from 'mongoose'
import * as queryString from "query-string"
import * as urlParser from 'url-parse'
import * as rawQueryParser from 'api-query-params'
import * as methods from './methods'
import mongoosePaginate from 'mongoose-paginate-v2'

export default class API {
    urlParser
    rawQueryParser
    connection
    requester
    models
    roles
    methods

    constructor(options) {
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
        this.methods = new Map()
        this.urlParser = urlParser
        this.rawQueryParser = rawQueryParser

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

        //schema.plugin(mongoosePaginate);
        schema.statics.get = methods._get
        schema.statics.post = methods._post
        schema.statics.delete = methods._delete
        schema.statics.patch = methods._patch
        schema.statics.pagination = methods._pagination

        let model = mongoose.model(modelName, schema);
        this.models.set(modelName, model)
    }

    async run(user, req) {

        let parsedUrl = this.urlParser(req.query)

        // Model Name +| Method +| Query +

        // /User?_id=5&get=items&items.type=4/vxcvx
        let method: string = req.method
        let modelName: string = parsedUrl.pathname.replace('/', '')

        let mongooseQuery = this.rawQueryParser(parsedUrl.query)

        if (this.models.has(modelName)) {
            let Model = this.models.get(modelName)
            let result = await Model[method]({
                body: req.body,
                filter: mongooseQuery
            })

            return this.filter(user, result, Model)
        }


    }

    async listen(port) {
        console.log(port + " listening...");
    }
    async on(event, handler) {

    }

    private filter(user: mongoose.Document, Model: mongoose.Model<any>, model: mongoose.Document): mongoose.Document {
        let paths = Model.prototype.schema.paths
        for (let i in paths) {
            let roleFunc = this.roles.get(paths[i])
            if (!roleFunc(user, model)) {
                model[i] = undefined
            }
        }
        return model
    }
}

