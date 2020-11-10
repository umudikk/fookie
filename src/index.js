module.exports = class API {

    constructor(options) {
        this.mongoose = require('mongoose')
        this.rawQueryParser = require('api-query-params')
        this.queryString = require('query-string');
        this.connection = null
        this.requester = null
        this.models = new Map()
        this.roles = new Map()
    }

    async connect(url = 'mongodb://localhost:27017/API', config = {}) {
        this.connection = await this.mongoose.connect(url, config)
        return this.connection

    }

    async parseRequester(req, res) {
        let user = await this.requester.findOne(req.body)
        return user != null ? { user } : false
    }

    async setRequester(model) {
        this.requester = model
    }

    async newRole(roleName, roleFunction) {
        this.roles.set(roleName, roleFunction)
    }

    async setModel(name, schema) {
        if (schema instanceof this.mongoose.Schema) {
            let model = this.mongoose.model(name, schema);
            this.models.set(name, model)
        } else if (typeof schema === 'object') {
            this.models.set(name, schema)
        } else {
            throw Error('[API] Invalid Schema Type')
        }

    }

    async controlAuth(User, Model, field) {
        return true
    }

    async filter(user, Model, model, method) {
        let paths = Model.prototype.schema.paths
        for (let i in paths) {
            let roleFunc = this.roles.get(paths[i].options.auth[method])
            if (!roleFunc(user, model)) {
                model[i] = undefined
            }
            console.log(paths[i].options.auth)
        }
        return model
    }

    async parseQuery(rawQuery) {
        return this.rawQueryParser(rawQuery)
    }

    async parseUrl(rawUrl) {
        let res = this.queryString.parseUrl(rawUrl)
        return { modelName: res.url, rawQuery: res.query }
    }

    async isMongooseModel(model) {
        return model.name == this.mongoose.Model.name.toLowerCase()
    }

    async run(user, { rawLongQuery, method }) {
        let queryRoutes = rawLongQuery.split('/')
        let model = null
        let rawUrl = null
        let nextRawUrl = null
        let response = null
        let isLast = null

        for (let step in queryRoutes) {

            let data = null
            if (queryRoutes.length - 1 == step) isLast = true

            rawUrl = queryRoutes[step]
            nextRawUrl = queryRoutes[step + 1]

            let { modelName, rawQuery } = await this.parseUrl(rawUrl)

            if (this.models.has(modelName)) {

                model = this.models.get(modelName)

                //mongoose model control
                if (this.isMongooseModel(model)) {
                    let mongooseQuery = await this.parseQuery(rawQuery)
                    data = await model.findOne(mongooseQuery)
                    await this.filter(user, model, data)

                } else {
                    data = model
                }




            } else {
                return 'err'
            }
        }
        console.log(response);

    }
    async listen(port) {
        console.log(port + " listenin...");
    }
    async on(event, handler) {

    }
}