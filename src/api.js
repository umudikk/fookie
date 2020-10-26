module.exports = class {
    requester = null
    models = new Map()
    roles = new Map()
    constructor(options) {}

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

    async setModel(model, auth) {
        this.models.set(model.name, { model, auth })
    }

    async run(user, { method, query, data }) {
        user.queryRoutes = query.split('/')
        for (let x in user.queryRoutes) {
            console.log(user.queryRoutes[x]);
        }

    }
    async listen(port) {
        console.log(port + " listenin...");
    }
    async on(event, handler) {

    }
}