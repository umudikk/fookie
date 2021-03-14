const { Sequelize, Op } = require('sequelize');
const { EventEmitter } = require('events')
const queryString = require("query-string")
const express = require('express')
const jwt = require('jsonwebtoken')
const { sha512 } = require('js-sha512')
const bodyParser = require('body-parser')
const { hasFields, response, clear } = require('./helpers')
const cors = require('cors')
const modelParser = require('./helpers/modelParser')
const findRequiredRoles = require('./helpers/requiredRoles');
const check = require('./helpers/check');
const calcEffects = require('./helpers/calcEffect')
const calcModify = require('./helpers/calcModify')

class Fookie extends EventEmitter {
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
    httpServer
    io
    sequelize

    constructor(config) {
        super()
        this.config = config
        this.connection = null
        this.models = new Map()
        this.roles = new Map()
        this.rules = new Map()
        this.effects = new Map()
        this.routines = new Map()
        this.modifies = new Map()
        this.store = new Set()
        this.helpers = {
            calcEffects,
            check,
            findRequiredRoles,
            clear,
            hasFields,
        }

        this.app = express()
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())

        //LOGIN REGISTER
        this.app.post('/login', async(req, res) => {
            let { email, password } = req.body

            if (this.models.has('User')) {
                let Model = this.models.get('User')
                let user = await Model.findOne({ where: { email, password: sha512(password) } })

                if (user instanceof Model && this.config.login) {
                    const token = jwt.sign({ id: user.id }, this.config.secret);
                    res.json(response(200, { token, user: user.filter(user, 'get') }))
                } else {
                    res.json(response(401, {}))
                }
            }
        })

        this.app.post('/register', async(req, res) => {
            let { email, password } = req.body

            if (this.models.has('User') && this.config.register) {
                let Model = this.models.get('User')
                let user = await Model.findOne({ email, password: sha512(password) })
                if (user instanceof Model) {
                    res.json(response(400, {}))
                } else {
                    user = await Model.create({ email, password })
                    res.json(response(201, {}))
                }
            }
        })

        this.app.use(async(req, res) => {

            //req
            let method = req.body.method || ""
            let body = req.body.body || {}
            let model = req.body.model || ""
            let query = req.body.query || {}
            let token = req.headers.TOKEN || ""

            //auth
            let payload = {}
            let user = {}

            try {
                payload = jwt.verify(token, this.config.secret) // deceded typeof _id
                let User = this.models.get('User')
                user = await User.findOne({ where: { payload } })
            } catch (error) {}

            let result = await this.run(user, req, method, model, query, body)
            res.json(result)
        })
    }



    async role(name, role) {
        this.roles.set(name, role)
    }

    async rule(name, rule) {
        this.roles.set(name, rule)
    }
    async modify(name, modify) {
        this.modifies.set(name, modify)
    }

    async model(model) {
        console.log(modelParser(model));
        let Model = this.sequelize.define(model.name, modelParser(model).schema)
        let ctx = this
        Model.get = async function({ query }) {
            return await Model.findOne(query)
        }
        Model.getAll = async function({ query }) {
            return await Model.findAll(query)
        }

        Model.post = async function({ body }) {
            let document = Model.build(body)
            return await document.save()
        }

        Model.delete = async function({ query }) {
            let document = await this.findOne(query)
            if (document instanceof Model) {
                return await document.destroy(query)
            } else {
                return false
            }
        }

        Model.patch = async function({ query, body }) {
            let document = await this.findOne(query)
            for (let f in body) {
                document[f] = body[f]
            }
            return await document.save()
        }

        Model.pagination = async function({ user, query, body }) {

        }

        Model.options = async function({ user, body }) {
            let document = model.schema
            let method = body.method || 'patch'
            let r = {}
            let res = {}


            let requiredRoles = findRequiredRoles(model, document, method)
            for (let i in keys) {

                if (requiredRoles.every(role => this.roles.has(role))) {
                    let canAccess = requiredRoles.some(role => this.roles.get(role)(user, document))
                    if (canAccess) {
                        res[keys[i]] = document[keys[i]]
                    }
                } else {
                    throw new Error('invalid roles')
                }
            }
            r.fields = res
            r.fookie = model.fookie
            return r

        }

        await this.sequelize.sync({ alter: true })
        model.model = Model
        this.models.set(model.name, model)
        return Model
    }

    async effect(name, effect) {
        this.effects.set(name, effect)
    }

    async run(user, req, method, modelName, query, body) {
        if (this.models.has(modelName) && typeof this.models.get(modelName).model[method] == 'function') {
            let model = this.models.get(modelName)
            console.log(`[${method}] Model:${modelName} |  Query:${query}`);
            if (check({ user, req, body, model, method, ctx: this })) {
                let result = await model.model[method]({ user, body, query })
                calcEffects({ user, req, model, result, method, ctx: this })
                return calcModify(({ user, model, result, method, ctx: this }))

            }
        } else {
            return "Model yok veya Method desteklenmiyor."
        }
    }

    async routine(name, time, func) {
        let API = this
        let routine = setInterval(() => {
            func(API)
        }, time);

        this.routines.set(name, routine)
    }

    async connect(url, config = {}) {
        this.sequelize = new Sequelize(url, {
            define: {
                freezeTableName: true
            },
            operatorsAliases: {
                $eq: Op.eq, // = 3
                $ne: Op.ne, // != 20
                $is: Op.is, // IS NULL
                $not: Op.not, // IS NOT TRUE
                $or: Op.or, // (someAttribute = 5) OR (someAttribute = 6)      
                $col: Op.col, // = "user"."organization_id"          
                $gt: Op.gt, // > 6
                $gte: Op.gte, // >= 6
                $lt: Op.lt, // < 10
                $lte: Op.lte, // <= 10
                $between: Op.between, // BETWEEN 6 AND 10
                $notBetween: Op.notBetween, // NOT BETWEEN 11 AND 15          
                $in: Op.in, // IN [1, 2]
                $notIn: Op.notIn, // NOT IN [1, 2]          
                $like: Op.like, // LIKE '%hat'
                $notLike: Op.notLike, // NOT LIKE '%hat'
                $startsWith: Op.startsWith, // LIKE 'hat%'
                $endsWith: Op.endsWith, // LIKE '%hat'
                $substring: Op.substring, // LIKE '%hat%'
                $iLike: Op.iLike, // ILIKE '%hat' (case insensitive) (PG only)
                $notILike: Op.notILike, // NOT ILIKE '%hat'  (PG only)
                $regexp: Op.regexp, // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
                $notRegexp: Op.notRegexp, // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
                $iRegexp: Op.iRegexp, // ~* '^[h|a|t]' (PG only)
                $notIRegexp: Op.notIRegexp, // !~* '^[h|a|t]' (PG only)          
                $any: Op.any, // ANY ARRAY[2, 3]::INTEGER (PG only)

            }
        })
        try {
            await this.sequelize.authenticate();
            await this.prepare()
            console.log('Connection has been established successfully.');


        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }


    async prepare() {
        let system_model = await this.model(require('./defaults/model/system_model.js'))
        let models = await system_model.findAll()
        for (let m of models) {
            console.log(m.schema.name + " SENKRONIZE EDILDI");
            let parsedModel = modelParser(m.schema)
            console.log(parsedModel);
            this.model(parsedModel)
        }

        //ROLES 
        this.role('everybody', require('./defaults/role/everybody'))
        this.role('everybody', require('./defaults/role/nobody'))
        this.role('system_admin', ({ user }) => {
            return true
        })

        //RULES
        this.rule('check_fields', ({ user }) => {
            return true
        })
        this.rule('check_auth', ({ user }) => {
            return true
        })

        //EFFECT
        this.effect('sync', require('./defaults/effect/sync'))

        //MODIFY
        this.modify('filter', require('./defaults/modify/filter'))
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`[API] ${port} is listening...`);

        })
    }
}

module.exports = Fookie