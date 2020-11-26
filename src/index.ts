import * as mongoose from 'mongoose'
import * as queryString from "query-string"
import * as urlParser from 'url-parse'
import * as rawQueryParser from 'api-query-params'
import mongoosePaginate from 'mongoose-paginate-v2'
import { EventEmitter } from 'events'

export default class API {
    urlParser
    rawQueryParser
    connection
    requester
    models
    roles
    methods

    constructor(options) {
        // super()
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
        this.methods = new Map()
        this.urlParser = urlParser
        this.rawQueryParser = rawQueryParser
    }

    async listen(port) {
        console.log(port + " listening...");
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

        // schema.plugin(mongoosePaginate);

        schema.methods.filter = function (user) {
            let paths = this.model.prototype.schema.paths
            for (let i in paths) {
                let roleFunc = this.roles.get(paths[i].options.auth)
                if (!roleFunc(user, model)) {
                    this[i] = undefined
                }
            }
            return model
        }

        schema.statics.get = async function ({ user, filter }) {
            let tmp = this.findOne(filter)
            tmp.filter(user)
            return tmp
        }

        schema.statics.post = async function ({ body }) {
            let model = new this(body)
            let tmp = await model.save()
            return tmp
        }

        schema.statics.delete = async function ({ filter }) {
            return await this.deleteOne(filter)
        }

        schema.statics.update = async function ({ filter, body }) {
            let tmp = this.findOne(filter)
            for (let i in body) {
                tmp[i] = body[i]
            }
            return await tmp.save()
        }

        schema.statics.pagination = async function ({ filter, body }) {
            return this.paginate(filter, body)
        }

        let model = mongoose.model(modelName, schema);
        this.models.set(modelName, model)
    }

    async run(user, req) {
        let parsedUrl = this.urlParser(req.query)
        let method: string = req.method
        let modelName: string = parsedUrl.pathname.replace('/', '')
        let mongooseQuery = this.rawQueryParser(parsedUrl.query)

        if (this.models.has(modelName)) {

            let Model = this.models.get(modelName)


            return await Model[method]({
                user,
                body: req.body,
                filter: mongooseQuery
            })

        }
    }

    private roleControl(user: mongoose.Document, body: object, method: string, Model: mongoose.Model<any>): boolean {
        let res = true
        let paths = Model.prototype.schema.paths

        console.log(body);

        return false
    }

    private filter(user: mongoose.Document, Model: mongoose.Model<any>, model: mongoose.Document): mongoose.Document {

    }
}

