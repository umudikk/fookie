const { Sequelize, Op } = require('sequelize');
const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { hasFields, clear } = require('./helpers')
const cors = require('cors')
const modelParser = require('./helpers/modelParser')
const findRequiredRoles = require('./helpers/requiredRoles');
const check = require('./helpers/check');
const calcEffects = require('./helpers/calcEffect')
const calcFilter = require('./helpers/calcFilter')
const calcModify = require('./helpers/calcModify')
const client = require('prom-client');
const lodash = require('lodash')

class Fookie {
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
            lodash
        }

        const collectDefaultMetrics = client.collectDefaultMetrics;
        const Registry = client.Registry;
        const register = new Registry();
        collectDefaultMetrics({ register });

        this.app = express()
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())

        this.app.post("/", async (req, res) => {
            //req
            let payload = {
                user: {},
                method: req.body.method || "",
                body: req.body.body || {},
                model: req.body.model || "",
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
        console.log(model.name);
        let Model = this.sequelize.define(model.name, modelParser(model).schema)
        model.methods = new Map()
        model.methods.set("get", async function ({ query }) {
            let res = await Model.findOne(query)
            return res
        })
        model.methods.set("post", async function ({ body }) {
            let document = Model.build(body)
            return await document.save()
        })
        model.methods.set("getAll", async function ({ query }) {
            return await Model.findAll(query)
        })
        model.methods.set("delete", async function ({ query }) {
            let document = await Model.findOne(query)
            if (document instanceof Model) {
                return await document.destroy(query)
            } else {
                return false
            }
        })
        model.methods.set("patch", async function ({ query, body }) {
            let document = await Model.findOne(query)
            for (let f in body) {
                document[f] = body[f]
            }
            return await document.save()
        })
        model.methods.set("schema", async function () {
            return model.schema
        })
        model.methods.set("count", async function ({ query }) {
            return await Model.count(query)
        })

        model.methods.set("test", async function (payload) {
            await payload.ctx.helpers.calcModify(payload)
            return await payload.ctx.helpers.check(payload)
        })

        this.sequelize.sync({ alter: true })
        model.model = Model
        this.models.set(model.name, model)
        return model
    }

    async effect(name, effect) {
        this.effects.set(name, effect)
    }

    async run(payload) {
        payload.response = {
            errors: [],
            status: 200,
            data: null
        }
        if (this.models.has(payload.model) && typeof this.models.get(payload.model).methods.get(payload.method) == 'function') {
            let model = this.models.get(payload.model)
            payload.model = model
            payload.ctx = this
            payload.result = null


            this.store.get("befores").forEach(async b => {
                await this.modifies.get(b)(payload)
            });

            await calcModify(payload)
            if (await check(payload)) {
                payload.result = await model.methods.get(payload.method)(payload) 
                await calcFilter(payload)
                calcEffects(payload)
                this.store.get("afters").forEach(async b => {
                    await this.modifies.get(b)(payload)
                });

                return payload.result

            } else {
                payload.response.errors.push("No Auth")
            }
        } else {
            payload.response.errors.push("No Model or method")
        }
    }

    routine(name, time, func) {
        let routine = setInterval(() => {
            func(this)
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

    async use(cb) {
        await cb(this)
    }

    async prepareDefaults() {

        //MODELS
        let model = await this.model(require('./defaults/model/system_model.js'))
        let system_model = model.model
        await this.model(require('./defaults/model/system_user.js'))
        await this.model(require('./defaults/model/system_admin.js'))


        //RULES
        this.rule('has_fields', require('./defaults/rule/has_fields'))
        this.rule('check_required', require('./defaults/rule/check_required'))
        this.rule('check_auth', require('./defaults/rule/check_auth'))
        this.rule('has_pwemail', require('./defaults/rule/has_pwemail'))
        this.rule('check_type', require('./defaults/rule/check_type'))
        this.rule('valid_attributes', require('./defaults/rule/valid_attributes'))

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
        this.modify("attributes", require('./defaults/modify/attributes'))

        // PLUGINS
        await this.use(require("./defaults/plugin/file_storage"))
        await this.use(require("./defaults/plugin/health_check"))
        await this.use(require("./defaults/plugin/login_register"))
        await this.use(require("./defaults/plugin/default_life_cycle_controls"))
        await this.use(require("./defaults/plugin/after_before_calculater"))

        this.store.set("validators", {
            string: "isString",
            number: "isNumber",
            integer: "isInteger",
            jsonb: "isObject",
            json: "isObject",
            date: "isDate",
            time: "isTime"
        })

        this.store.set("secret", "secret")
        this.store.set("afters", [])
        this.store.set("befores", [])


        //SYNC
        let models = await system_model.findAll()
        for (let m of models) {
            await this.model(m)
        }
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`FOOKIE ${port} is listening...`);

        })
    }
}

module.exports = Fookie