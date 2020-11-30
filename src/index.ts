import * as mongoose from 'mongoose'
import * as queryString from "query-string"
//import * as urlParser from 'url-parse'
import * as urlParser from 'query-string'
import * as rawQueryParser from 'api-query-params'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { EventEmitter } from 'events'

export default class API {
    urlParser
    rawQueryParser
    connection
    requester
    models
    roles
    paginate

    constructor(options) {
        // super()
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
        this.urlParser = queryString
        this.rawQueryParser = rawQueryParser
        this.paginate = mongoosePaginate
    }

    async listen(port) {
        console.log(port + " listening...");
    }

    async connect(url: string, config: object = {}) {
        this.connection = await mongoose.connect(url, config)
        return this.connection

    }

    async parseRequester(req) {
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

        let roles = this.roles
        schema.plugin(this.paginate)

        schema.statics.GET = async function ({ user, filter }) {
            let tmp = await this.findOne(filter)
            return tmp
        }

        schema.statics.POST = async function ({ user, body }) {
            let model = new this(body)
            if (model.checkAuth(user, body, 'post')) {
                let tmp = await model.save()
                return tmp
            } else {
                return false
            }


        }

        schema.statics.DELETE = async function ({ filter }) {
            return await this.deleteOne(filter)
        }

        schema.statics.PATCH = async function ({ filter, body }) {
            let tmp = await this.findOne(filter)
            for (let i in body) {
                tmp[i] = body[i]
            }
            return await tmp.save()
        }

        schema.statics.PAGINATION = async function ({ filter, body }) {
            return this.paginate(filter, body)
        }


        schema.methods.filter = function (user) {
            let paths = this.model.prototype.schema.paths
            console.log(paths);
        }
        schema.methods.checkAuth = function (user, model, method: string): boolean {
            let keys = Object.keys(model)
            for (let i in keys) {
                console.log(keys[i]);

                let str = this.schema.tree[keys[i]].auth[method]
                if (str.every(i => roles.has(i))) {
                    return str.every(i => roles.get(i)(user, model))
                }
                else {
                    return false
                }
            }
        }

        let model = mongoose.model(modelName, schema);
        this.models.set(modelName, model)
    }


    async exec(user, Model, method, filter, body) {

        return await Model[method]({
            user,
            body,
            filter: filter
        })
    }
    async run(user, method: string, query: string, body: object) {
        let parsedUrl = this.urlParser.parseUrl(query)
        let modelName: string = parsedUrl.url.replace('/', '')
        let mongooseQuery = this.rawQueryParser(parsedUrl.query)

        if (this.models.has(modelName)) {
            let Model = this.models.get(modelName)
            return await this.exec(user, Model, method, mongooseQuery.filter, body)
        }
    }
}

