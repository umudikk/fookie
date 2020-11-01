module.exports = {
    mongoose: require('mongoose'),
    requester: null,
    models: new Map(),
    roles: new Map(),
    constructor(options) {},

    async connect(config) {


    },
    async parseRequester(req, res) {
        let user = await this.requester.findOne(req.body)
        return user != null ? { user } : false
    },

    async setRequester(model) {
        this.requester = model
    },

    async newRole(roleName, roleFunction) {
        this.roles.set(roleName, roleFunction)
    },

    async setModel(model, payload) {
        this.models.set(model, payload)
    },
    async controlAuth(User, Model, field) {
        return true
    },
    async filter(User, pair, data) {



    },

    async run(user, { method, query, data }) {
        let queryRoutes = query.split('/')
        let pair = null
        let current = null
        let next = null
        let response = null
        let isLast = null

        for (let step in queryRoutes) {
            let data = null
            if (queryRoutes.length - 1 == x) isLast = true
            current = queryRoutes[step]
            next = queryRoutes[step + 1]

            //isModel
            if (this.models.has(current)) {
                pair = this.models.get(current)

                if (pair.model instanceof this.mongoose.Model) {
                    data = await pair.model.findOne({ _id: next })
                } else {
                    data = pair.model
                }

                response += API.filter(User, pair, data)

            } else {
                return 'err'
            }
        }

    },
    async listen(port) {
        console.log(port + " listenin...");
    },
    async on(event, handler) {

    },
}