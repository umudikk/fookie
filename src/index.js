const express = require('express')
const bodyParser = require('body-parser')
const { hasFields, clear } = require('./helpers')
const cors = require('cors')
const mongooseModelParser = require('./helpers/mongooseModelParser')
const findRequiredRoles = require('./helpers/requiredRoles');
const check = require('./helpers/check');
const calcEffects = require('./helpers/calcEffect')
const calcFilter = require('./helpers/calcFilter')
const calcPreRequirements = require('./helpers/calcPreRequirements')
const calcModify = require('./helpers/calcModify')
const client = require('prom-client');
const lodash = require('lodash')
var mongoose = require('mongoose')
const deepMerge = require("deepmerge");
var { Schema } = mongoose

class Fookie {
    constructor() {
        this.models = new Map()
        this.roles = new Map()
        this.rules = new Map()
        this.effects = new Map()
        this.routines = new Map()
        this.filters = new Map()
        this.modifies = new Map()
        this.mixins = new Map()
        this.store = new Map()

        this.helpers = {
            calcEffects,
            check,
            findRequiredRoles,
            clear,
            hasFields,
            lodash,
            deepMerge
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
            let payload = req.body
            payload.req = req
            payload.res = res
            payload.token = req.headers.token
            //auth
            await this.run(payload)
            res.status(payload.response.status).json(payload.response.data)
        })

    }

    role(name, role) {
        this.roles.set(name, role)
    }

    mixin(name, mixin) {
        this.mixins.set(name, mixin)
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

    async model(model) {
        if (model.hasOwnProperty('mixin')) {
            for (let mixin of model.mixin) {
                let mxn = this.mixins.get(mixin)
                model = deepMerge(model, mxn)
            }
        }

        let parsedModel = mongooseModelParser(model)

        let Model = mongoose.model(model.name, new Schema(parsedModel))
        model.methods = new Map()

        model.methods.set("get", async function ({ query, response, attributes }) {
            let res = await Model.findOne(query.where, attributes)
            if (res) {
                response.status = 200
            } else {
                response.status = 201
                response.errors.push("get error")
            }
            return res
        })
        model.methods.set("getAll", async function ({ query, attributes }) {
            let res = await Model.find(query.where, attributes)
            if (res) {
                return res
            } else {
                return []
            }
        })
        model.methods.set("post", async function ({ body, target }) {
            for (let f in body) {
                target[f] = body[f]
            }
            let res = await target.save()
            return res
        })
        model.methods.set("delete", async function ({ target }) {
            return await target.remove()
        })
        model.methods.set("patch", async function ({ body, target }) {
            for (let f in body) {
                target[f] = body[f]
            }
            return await target.save()
        })
        model.methods.set("schema", async function () {
            return model
        })
        model.methods.set("count", async function ({ query }) {
            let res = await Model.countDocuments(query.where)
            return res
        })

        model.methods.set("test", async function (payload) {
            await payload.ctx.helpers.calcModify(payload)
            return await payload.ctx.helpers.check(payload)
        })

        model.model = Model
        this.models.set(model.name, model)
        let res = await this.run({
            user: { system: true },
            method: "get",
            model: "system_model",
            query: {
                where: {
                    name: model.name
                }
            }
        })
        let target_model = res.data
        if (target_model) {
            await this.run({
                user: { system: true },
                method: "patch",
                model: "system_model",
                body: {
                    name: model.name,
                    display: model.display,
                    schema: model.schema,
                    fookie: model.fookie,
                }
            })
        } else {
            await this.run({
                user: { system: true },
                method: "post",
                model: "system_model",
                body: {
                    name: model.name,
                    display: model.display,
                    schema: model.schema,
                    fookie: model.fookie,
                }
            })
            console.log("MODEL YARATILDI: " + model.name, res.status);
        }

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
        payload.ctx = this
        // -------------

        // -------------
        if (await calcPreRequirements(payload)) {
            for (let b of this.store.get("befores")) {
                await this.modifies.get(b)(payload)
            }
            await calcModify(payload)
            if (await check(payload)) {
                payload.response.data = await payload.ctx.models.get(payload.model).methods.get(payload.method)(payload)
                if (payload.response.status == 200) {
                    await calcFilter(payload)
                    calcEffects(payload)
                }
            }

            for (let b of this.store.get("afters")) {
                await this.effects.get(b)(payload)
            }
        }

        console.log(`[RESPONSE] ${payload.model} | ${payload.method} | [${payload.response.errors}] | ${payload.response.status}`);
        return payload.response
    }

    routine(name, time, func) {
        let routine = setInterval(() => {
            func(this)
        }, time);

        this.routines.set(name, routine)
    }

    async connect(url, config) {
        await mongoose.connect(url, config);
        await this.prepareDefaults()
    }

    async use(cb) {
        await cb(this)
    }

    async prepareDefaults() {
        this.store.set("secret", "secret")
        this.store.set("afters", [])
        this.store.set("befores", ["default_payload", "set_user"])

        // IMPORTANT PLUGINS
        await this.use(require("./defaults/plugin/after_before_calculater"))
        await this.use(require("./defaults/plugin/health_check"))
        await this.use(require("./defaults/plugin/default_life_cycle_controls"))

        //RULES
        this.rule('has_fields', require('./defaults/rule/has_fields'))
        this.rule('check_required', require('./defaults/rule/check_required'))
        this.rule('only_client', require('./defaults/rule/only_client'))
        this.rule('check_auth', require('./defaults/rule/check_auth'))
        this.rule('has_pwemail', require('./defaults/rule/has_pwemail'))
        this.rule('check_type', require('./defaults/rule/check_type'))
        this.rule('valid_attributes', require('./defaults/rule/valid_attributes'))
        this.rule('need_target', require('./defaults/rule/need_target'))

        //preRule
        this.rule('has_model', require('./defaults/rule/has_model'))
        this.rule('has_method', require('./defaults/rule/has_method'))
        this.rule('has_body', require('./defaults/rule/has_body'))
        this.rule('need_method_in_options', require('./defaults/rule/need_method_in_options'))

        //ROLES 
        this.role('everybody', require('./defaults/role/everybody'))
        this.role('nobody', require('./defaults/role/nobody'))
        this.role('system_admin', require('./defaults/role/system_admin'))
        this.role('system', require('./defaults/role/system'))

        //EFFECT
        this.effect('sync', require('./defaults/effect/sync'))

        //FILTERS
        this.filter('filter', require('./defaults/filter/filter'))
        // this.filter('add_static_models', require('./defaults/filter/add_static_models'))

        //MODIFIES
        this.modify('password', require('./defaults/modify/password'))
        this.modify("set_default", require('./defaults/modify/set_default'))
        this.modify("set_target", require('./defaults/modify/set_target'))
        this.modify("set_user", require('./defaults/modify/set_user'))
        this.modify("default_payload", require('./defaults/modify/default_payload'))
        this.modify("increase", require('./defaults/modify/increase'))

        //MODELS
        await this.model(require('./defaults/model/system_model.js'))
        await this.model(require('./defaults/model/system_menu.js'))
        await this.model(require('./defaults/model/system_submenu.js'))
        await this.model(require('./defaults/model/system_user.js'))
        await this.model(require('./defaults/model/system_admin.js'))

        // PLUGINS
        //await this.use(require("./defaults/plugin/file_storage"))
        await this.use(require("./defaults/plugin/login_register"))
        return true
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`FOOKIE ${port} is listening...`);

        })
    }
}

module.exports = Fookie