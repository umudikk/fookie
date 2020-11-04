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
        let model = this.mongoose.model(name, schema);
        this.models.set(name, model)
    }
    async controlAuth(User, Model, field) {
        return true
    }
    async filter(User, Model, data) {



    }

    async parseQuery(rawQuery) {
        return this.rawQueryParser(rawQuery)
    }
    async parseUrl(rawUrl) {
        let res = this.queryString.parseUrl(rawUrl)
        return { modelName: res.url, rawQuery: res.query }
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
                console.log(this.connection);
                if (model == this.mongoose.Model) {
                    let mongooseQuery = await this.parseQuery(rawQuery)
                    console.log(true);
                    data = await model.findOne(mongooseQuery)

                } else {
                    console.log(false);
                    data = model
                }

                //  response += API.filter(User, model, data)


            } else {
                return 'err'
            }
        }

    }
    async listen(port) {
        console.log(port + " listenin...");
    }
    async on(event, handler) {

    }
}