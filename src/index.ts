import * as mongoose from 'mongoose'
import * as queryString from "query-string"
import * as rawQueryParser from 'api-query-params'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { EventEmitter } from 'events'

export default class API extends EventEmitter {
    urlParser
    rawQueryParser
    connection
    requester
    models
    roles
    paginate

    constructor(options) {
        super()
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
        this.urlParser = queryString
        this.rawQueryParser = rawQueryParser
        this.paginate = mongoosePaginate

        this.roles.set('everybody', () => {
            return true
        })
        this.roles.set('nobody', () => {
            return false
        })
    }

    async connect(url: string, config: object = {}) {
        this.connection = await mongoose.connect(url, config)
        return this.connection

    }

    async newRole(roleName: String, roleFunction: Function) {
        this.roles.set(roleName, roleFunction)
    }

    async setModel(modelName: string, schema: mongoose.Schema<any>) {
        let roles = this.roles
        schema.plugin(this.paginate)

        schema.statics.GET = async function ({ user, filter }) {
            let document = await this.findOne(filter)
            if (document instanceof mongoose.Model) {
                return document.filter(user)
            } else {
                return false
            }

        }

        schema.statics.POST = async function ({ user, body }) {
            let document = new this(body)
            if (document.checkAuth(user, 'post', body)) {
                let tmp = await document.save()
                return tmp
            } else {
                return false
            }
        }

        schema.statics.DELETE = async function ({ user, filter }) {
            let document = await this.findOne(filter)
            if (document instanceof mongoose.Model) {
                let obj = document.toObject()
                delete obj._id
                if (document.checkAuth(user, 'delete', obj)) {
                    return await document.remove()
                } else {
                    return false
                }
            } else {
                return false
            }
        }

        schema.statics.PATCH = async function ({ user, filter, body }) {
            let document = await this.findOne(filter)
            if (document instanceof mongoose.Model) {
                let obj = document.toObject()
                delete obj._id
                if (document.checkAuth(user, 'patch', obj)) {
                    for (let i in body) {
                        document[i] = body[i]
                    }
                    return await document.save()
                } else {
                    return false
                }
            } else {
                return false
            }


        }

        schema.statics.PAGINATION = async function ({ user, filter, body }) {
            return this.paginate(filter, body)
        }


        schema.methods.filter = function (user) {
            let objectDocument = this.toObject()
            let keys = Object.keys(objectDocument)
            keys = keys.filter(key => key != '_id')

            for (let i in keys) {
                let requiredRoles = this.schema.tree[keys[i]].auth['get']
                if (requiredRoles.every(role => roles.has(role))) {
                    let canAccess = requiredRoles.some(role => roles.get(role)(user, objectDocument))
                    canAccess ? console.log('canAcess yes') : delete objectDocument[keys[i]]
                }
                else {
                    throw new Error('invalid roles')

                }
            }
            return objectDocument
        }

        schema.methods.checkAuth = function (user, method: string, body): boolean {
            let keys = Object.keys(body)
            for (let i in keys) {
                let requiredRoles = this.schema.tree[keys[i]].auth[method]
                if (requiredRoles.every(i => roles.has(i))) {
                    return requiredRoles.some(i => roles.get(i)(user, body))
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
