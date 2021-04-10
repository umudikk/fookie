const { Sequelize, Op } = require('sequelize');
const express = require('express')
const jwt = require('jsonwebtoken')
const { sha512 } = require('js-sha512')
const bodyParser = require('body-parser')
const { hasFields, clear } = require('./helpers')
const cors = require('cors')
const modelParser = require('./helpers/modelParser')
const findRequiredRoles = require('./helpers/requiredRoles');
const check = require('./helpers/check');
const calcEffects = require('./helpers/calcEffect')
const calcFilter = require('./helpers/calcFilter')
const calcModify = require('./helpers/calcModify')

class Fookie {
    connection
    requester
    models
    roles
    effects
    paginate
    app
    routines
    sequelize

    constructor() {
        this.connection = null
        this.models = new Map()
        this.roles = new Map()
        this.rules = new Map()
        this.effects = new Map()
        this.routines = new Map()
        this.filters = new Map()
        this.modifies = new Map()
        this.store = new Map()
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

        this.app.use(async (req, res) => {

            //req
            let payload = {
                method: req.body.method || "",
                body: req.body.body || {},
                modelName: req.body.model || "",
                query: req.body.query || {},
                token: req.headers.token || "",
                options: req.body.options || {},
            }

            //auth
            jwt.verify(payload.token, this.store.get("secret"), async (err, parsed) => {
                let User = this.models.get('system_user').model
                if (!err) {
                    payload.user = await User.findOne({ where: { id: parsed.id } })
                }
                res.json(await this.run(payload))
            });
        })
    }

    role(name, role) {
        this.roles.set(name, role)
    }

    rule(name, rule) {
        this.rules.set(name, rule)
    }
    filter(name, filter) {
        this.filters.set(name, filter)
    }
    modify(name, before) {
        this.modifies.set(name, before)
    }

    model(model) {
        let Model = this.sequelize.define(model.name, modelParser(model).schema)

        Model.get = async function ({ query }) {
            let res = await Model.findOne(query)
            return res
        }
        Model.getAll = async function ({ query }) {
            return await Model.findAll(query)
        }

        Model.post = async function ({ body }) {
            let document = Model.build(body)
            return await document.save()
        }

        Model.delete = async function ({ query }) {
            let document = await this.findOne(query)
            if (document instanceof Model) {
                return await document.destroy(query)
            } else {
                return false
            }
        }

        Model.patch = async function ({ query, body }) {
            let document = await this.findOne(query)
            for (let f in body) {
                document[f] = body[f]
            }
            return await document.save()
        }

        Model.schema = async function () {
            return model.schema
        }
        Model.count = async function ({ body }) {
            return await this.count(query)
        }

        this.sequelize.sync({ alter: true })
        model.model = Model
        this.models.set(model.name, model)
        return Model
    }

    async effect(name, effect) {
        this.effects.set(name, effect)
    }

    async run(payload) {
        if (this.models.has(payload.modelName) && typeof this.models.get(payload.modelName).model[payload.method] == 'function') {
            let model = this.models.get(payload.modelName)
            payload.model = model
            payload.ctx = this
            await calcModify(payload)
            if (await check(payload)) {
                payload.result = await model.model[payload.method](payload)
                if (payload.result) {
                    await calcFilter(payload)
                    calcEffects(payload)
                }
                return payload.result

            } else {
                return "NO AUTH"
            }
        } else {
            return "Model yok veya Method desteklenmiyor."
        }
    }

    routine(name, time, func) {
        let API = this
        let routine = setInterval(() => {
            func(API)
        }, time);

        this.routines.set(name, routine)
    }

    async connect(url, config = {}) {
        this.sequelize = new Sequelize(url, {
            logging: false,
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
            await this.prepareDefaults()
            console.log('Connection has been established successfully.');


        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async set(cb) {
        await cb(this)
    }

    async prepareDefaults() {

        //MODELS
        let system_model = await this.model(require('./defaults/model/system_model.js'))
        await this.model(require('./defaults/model/system_user.js'))
        await this.model(require('./defaults/model/system_admin.js'))

        //SYNC
        let models = await system_model.findAll()
        for (let m of models) {
            await this.model(modelParser(m))
        }

        //RULES
        this.rule('has_fields', require('./defaults/rule/has_fields'))
        this.rule('check_required', require('./defaults/rule/check_required'))
        this.rule('check_auth', require('./defaults/rule/check_auth'))
        this.rule('has_pwemail', require('./defaults/rule/has_pwemail'))

        //ROLES 
        this.role('everybody', require('./defaults/role/everybody'))
        this.role('nobody', require('./defaults/role/nobody'))
        this.role('system_admin', require('./defaults/role/system_admin'))
        this.role('system', require('./defaults/role/system'))

        //EFFECT
        this.effect('sync', require('./defaults/effect/sync'))

        //FILTERS
        this.filter('filter', require('./defaults/filter/filter'))
        this.filter('add_static_models', require('./defaults/filter/add_static_models'))

        //MODIFIES
        this.modify('password', require('./defaults/modify/password'))
        this.modify("set_defaults", require('./defaults/modify/set_defaults'))

        // PLUGINS
        this.set(require("./defaults/plugin/health_check"))
        this.set(require("./defaults/plugin/login_register"))
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`FOOKIE ${port} is listening...`);

        })
    }
}

module.exports = Fookie