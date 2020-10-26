export default class {
    requester = null
    models = new Map()
    roles = new Map()
    constructor(options) {

    }
    setRequester(model) {
        this.requester = model
    }
    newRole(roleName, roleFunction) {
        this.roles.set(roleName, roleFunction)
    }
    setModel(model, auth) {
        this.models.set(model.name, { model, auth })
    }
    run({ method, endpoint, data }) {

    }
}