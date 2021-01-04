import * as mongoose from 'mongoose'
import * as queryString from "query-string"
import * as rawQueryParser from 'api-query-params'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { EventEmitter } from 'events'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { sha512 } from 'js-sha512';
import * as bodyParser from 'body-parser'
import * as cachegoose from 'cachegoose'
import { Method, Login } from './types/index'
import { hasFields, response } from './helpers'
import * as http from 'http'


export default class API extends EventEmitter {
    urlParser
    rawQueryParser
    connection
    requester
    models
    roles
    effects
    paginate
    app
    jwt
    config
    routines

    constructor(config) {
        super()
        this.connection = null
        this.models = new Map()
        this.roles = new Map()
        this.effects = new Map()
        this.routines = new Map()
        this.urlParser = queryString
        this.rawQueryParser = rawQueryParser
        this.app = express()
        this.config = config
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())


        //LOGIN REGISTER
        this.app.post('/login', async (req, res) => {
            let { email, password }: Login = req.body

            if (this.models.has('User')) {
                let Model = this.models.get('User')
                let user = await Model.findOne({ email, password: sha512(password) })

                if (user instanceof mongoose.Model && this.config.login) {
                    const token = jwt.sign({ _id: user._id }, this.config.secret);
                    res.json(response(200, { token, user:user.filter(user) }))
                } else {
                    res.json(response(401, {}))
                }
            }
            
        })

        this.app.post('/register', async (req, res) => {
            let { email, password }: Login = req.body

            if (this.models.has('User') && this.config.register) {
                let Model = this.models.get('User')
                let user = new Model({ email, password: sha512(password) })
                user = await user.save()
                if (user) {
                    res.json(response(201, {}))
                } else {
                    res.json(response(503, {}))
                }
            }

        })

        //CONST ROLES
        this.roles.set('everybody', () => {
            return true
        })
        this.roles.set('nobody', () => {
            return false
        })


        this.app.use(async (req, res) => {
            console.log("ım here");
            
            let method = req.method.toLowerCase()
            let body = req.body || {}
            let token = req.headers.TOKEN || ''
            let payload = {}
            let user = {}

            try {
                payload = jwt.verify(token, this.config.secret) // deceded typeof _id
                let User = this.models.get('User')
                user = await User.findOne({ payload })
            } catch (error) {
            }

            let result = await this.run(user, method, req.originalUrl, body)
            res.json(result)
        })
    }

    async connect(url: string, config: object = {}) {
        this.connection = await mongoose.connect(url, config)
        return this.connection
    }

    async role(name: String, role: Function) {
        this.roles.set(name, role)
    }

    async model(modelName: string, schema: mongoose.Schema) {
        let roles = this.roles
        let models = this.models
        let config = this.config
        let effects = this.effects

        schema.plugin(mongoosePaginate)

        schema.statics.get = async function ({ user, query }) {
            let document = await this.findOne(query)
            if (document instanceof mongoose.Model) {
                return document.filter(user)
            } else {
                return false
            }
        }

        schema.statics.post = async function ({ user, body }) {
            let document = new this(body)
            if (document.checkAuth(user, 'post', body)) {
                let tmp = await document.save()
                return tmp
            } else {
                return false
            }
        }

        schema.statics.delete = async function ({ user, query }) {
            let document = await this.findOne(query)
            if (document instanceof mongoose.Model) {
                if (document.checkAuth(user, 'delete', document.toObject())) {
                    return await document.remove()
                } else {
                    return false
                }
            } else {
                return false
            }
        }

        schema.statics.patch = async function ({ user, query, body }) {
            let document = await this.findOne(query)
            if (document instanceof mongoose.Model) {
                if (document.checkAuth(user, 'patch', document.toObject())) {
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

        schema.statics.pagination = async function ({ user, query, body }) {
            return this.paginate(query, body)
        }

        schema.statics.options = async function ({ user, query, body }) {
            return this.schema.paths
        }

        //HELPERS 
        schema.methods.filter = function (user) {
            let objectDocument = this.toObject()
            delete objectDocument._id
            delete objectDocument.__v
            let keys = Object.keys(objectDocument)
           

            for (let i in keys) {
                let requiredRoles = this.schema.tree[keys[i]].fookie.get.auth
                if (requiredRoles.every(role => roles.has(role))) {
                    let canAccess = requiredRoles.some(role => roles.get(role)(user, objectDocument))
                    canAccess ? null : delete objectDocument[keys[i]]
                } else {
                    throw new Error('invalid roles')
                }
            }
            return objectDocument
        }

        schema.methods.checkAuth = function (user, method: string, body): boolean {
            delete body._id
            delete body.__v
            let keys = Object.keys(body)
            for (let i in keys) {
                let requiredRoles = this.schema.tree[keys[i]].fookie[method].auth
                if (requiredRoles.every(i => roles.has(i))) {
                    try {
                        return requiredRoles.some(i => roles.get(i)(user, body))
                    } catch (error) {
                        console.log(error)
                        return false
                    }

                } else {
                    return false
                }
            }
        }

        schema.statics.calcEffects = async function (user, method, document) {
            let ctx = this
            if (document instanceof mongoose.Model) {
                document = document.toObject()
                delete document._id
                delete document.__v
                let keys = Object.keys(document)

                for (let i in keys) {
                    let requiredEffects = this.schema.path(keys[i]).options['fookie'][method].effect
                    if (requiredEffects.every(e => effects.has(e))) {
                        requiredEffects.forEach(async (effect) => {
                            await effects.get(effect)(user, document, ctx)
                        });
                    }
                }
            }
        }

        let model = mongoose.model(modelName, schema);
        this.models.set(modelName, model)
    }

    async effect(name: string, effect: (user: mongoose.Document, document: mongoose.Document, ctx) => Promise<any>) {
        this.effects.set(name, effect)
    }

    async exec(user, Model, method, query = {}, body = {}) {
        if (hasFields(Model, body)) {
            let result = await Model[method]({
                user,
                body,
                query
            })
            if (result) {
                await Model.calcEffects(user, method, result)
                return response(200, result)
            } else {
                return response(400, null)
            }

        } else {
            return response(400, null)
        }

    }

    async run(user, method: string, query: string, body: object) {
        let parsedUrl = this.urlParser.parseUrl(query)
        let modelName: string = parsedUrl.url.replace('/', '')
        let mongooseQuery = this.rawQueryParser(parsedUrl.query)

        if (this.models.has(modelName)) {
            let Model = this.models.get(modelName)
            if (typeof Model[method] == 'function') {
                console.log(`[${method}] Model:${modelName} |  Query:${query}`);
                return await this.exec(user, Model, method, mongooseQuery.filter, body)
            } else {
                return response(405, {})
            }
        } else {
            return response(404, {})
        }
    }

    async routine(name, time, func) {
        let API = this
        let routine = setInterval(() => {
            func(API)
        }, time);

        this.routines.set(name, routine)
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`[API] ${port} is listening...`);

        })
    }
}