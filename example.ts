import api from './src'
import User from './src/schemas/User'
import Inventory from './src/schemas/Inventory'


(async () => {

    const API = new api({})




    await API.connect('mongodb://localhost:27017/API', {})

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

    API.setModel('User', User)
    API.setModel('Inventory', Inventory)

    API.on('run', async (user, query) => {

        API.run(user, query)
    })

    API.listen(8080)

    //EXAMPLE RUN

    let res0 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
        method: 'get',
        query: 'User?_id=0/Inventory/items',
    })

    let res1 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
        method: 'delete',
        query: 'User?_id=0&name=umudik&color=red/Inventory',
    })

    let res2 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
        method: 'giveItem',
        query: 'User?_id=0/inventory',
        body: {
            key: "money",
            amount: 500
        }
    })

    let res3 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
        method: 'giveItem',
        query: 'User?status=sent&timestamp>2016-01-01&author.firstName=/john/i&limit=100&skip=50&sort=-timestamp&populate=logs&fields=id,logs.ip',
        body: {
            key: "money",
            amount: 500
        }
    })




})()
