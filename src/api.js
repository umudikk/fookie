module.exports = class {
    requester = null
    models = new Map()
    roles = new Map()
    constructor(options) {}

    async connect(config) {

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

    async setModel(model, payload) {
        this.models.set(model, payload)
    }

    async run(user, { method, query, data }) {
        let queryRoutes = query.split('/')
        let model = null
        let current = null
        let next = null
        let response = {}
        let isLast = null

        for (let x in queryRoutes) {
            if (queryRoutes.length - 1 == x) isLast = true
            current = queryRoutes[x]
            next = queryRoutes[x + 1]

            //isModel
            if (this.models.has(current)) {
                model = this.models.get(current)
                model.findOne({ _id: next })
            }
        }

    }
    async listen(port) {
        console.log(port + " listenin...");
    }
    async on(event, handler) {

    }
}