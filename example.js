import API from './Model-Auth-Tree/src/api'
import User from './Model-Auth-Tree/User'


API.setRequester(User)

API.newRole('admin', (User, model) => {
    return User.type == 'admin'
})

API.newRole('everyone', (User, model) => {
    return true
})
API.newRole('nobody', (User, model) => {
    return false
})
API.newRole('owner', (User, model) => {
    return User._id == model.owner ? true : false
})
API.newRole('editor', (User, model) => {
    return User.type == "editor" ? true : false
})

API.setModel(User, {
    post: ["system"],
    get: {
        name: ["everyone"],
        inventory: ["self"],
        password: ["nobody"]
    },
    delete: ["system"],
})



let res0 = await API.run({
    method: 'delete',
    endpoint: '/User/0/inventory/0',
})

let res1 = await API.run({
    method: 'giveItem',
    endpoint: '/User/0/inventory',
    data: {
        key: "money",
        amount: 500
    }
})

let res2 = await API.run({
    method: 'get',
    endpoint: 'User/0/inventory',
})

API.listen(8080)