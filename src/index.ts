import * as mongoose from 'mongoose'
import * as queryString from "query-string"
import * as rawQueryParser from 'api-query-params'
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { EventEmitter } from 'events'
import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { sha512 } from 'js-sha512';
import * as bodyParser from 'body-parser'

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

    constructor(config) {
        super()
        this.connection = null
        this.models = new Map()
        this.roles = new Map()
        this.effects = new Map()
        this.urlParser = queryString
        this.rawQueryParser = rawQueryParser
        this.paginate = mongoosePaginate
        this.app = express()
        this.jwt = jwt
        this.config = config


        //LOGIN REGISTER
        this.app.post('/login', (req, res) => {
            let mail = req.body.mail
            let password = req.body.password

            if (this.models.has('User')) {
                let Model = this.models.get('User')
                let user = Model.findOne({ mail, password: sha512(password) })
                console.log(sha512(user.password))

                if (user instanceof mongoose.Model) {
                    let token = jwt.sign(user._id, this.config.secret);
                    res.json({ token })
                }
            }

            let token = jwt.sign({ foo: 'bar' }, 'shhhhh')
            res.json({ token })
        })

        this.app.post('/register', (req, res) => {
            console.log('register');
        })

        //CONST ROLES
        this.roles.set('everybody', () => {
            return true
        })
        this.roles.set('nobody', () => {
            return false
        })
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(async (req, res) => {
            let user = { id: 0, type: 'admin', name: 'umut' }
            let result = await this.run(user, req.method, req.originalUrl, req.body)
            res.json(result)
        })
    }

    async connect(url: string, config: object = {}) {
        this.connection = await mongoose.connect(url, config)
        return this.connection

    }

    async newRole(name: String, role: Function) {
        this.roles.set(name, role)
    }

    async setModel(modelName: string, schema: mongoose.Schema) {
        let roles = this.roles
        let models = this.models
        let config = this.config
        let effects = this.effects

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
                let requiredRoles = this.schema.tree[keys[i]].fookie.get.auth
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
                let requiredRoles = this.schema.tree[keys[i]].fookie[method].auth
                if (requiredRoles.every(i => roles.has(i))) {
                    return requiredRoles.some(i => roles.get(i)(user, body))
                }
                else {
                    return false
                }
            }
        }

        schema.statics.calcEffects = function (user, method, document) {
            if (document instanceof mongoose.Model) {
                document = document.toObject()
                delete document._id
                let keys = Object.keys(document)
                console.log(document);
                
                for (let i in keys) {
                    console.log(document.schema.tree[keys[i]].fookie[method]['effect']);
                    let requiredEffects = document.schema.tree[keys[i]].fookie[method].effect
                 

                    if (requiredEffects.every(e => effects.has(e))) {
                        requiredEffects.forEach(effect => {
                            try {
                                effects[effect](user, this, models, config)
                            }
                            catch (error) {

                            }
                        });
                    }
                }
            }
        }

        let model = mongoose.model(modelName, schema);
        this.models.set(modelName, model)
    }

    async setEffect(name: string, effect: (user: mongoose.Document, document: mongoose.Document, Models: Array<mongoose.Model<any>>, config: Object) => void) {
        this.effects.set(name, effect)
    }

    async exec(user, Model, method, filter, body) {
        let result = await Model[method]({
            user,
            body,
            filter
        })
        if (result) {
            Model.calcEffects(user, method, result)
        }
        return result
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

    listen(port) {
        this.app.listen(port, () => {
            console.log(`[API] ${port} is listening...`);

        })

    }

}
