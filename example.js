 const api = require('./src/index')
 const User = require('./schemas/User.js')
 const Inventory = require('./schemas/Inventory.js')
 const API = new api()

 API.connect('mongodb://localhost:27017/API', {})

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

 API.setModel('User', User, )
 API.setModel('Inventory', Inventory)

 API.on('run', async(user, query) => {

     API.run(user, query)
 })

 API.listen(8080)

 //EXAMPLE RUN

 let res0 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'get',
     rawLongQuery: 'User?_id=0//Inventory/items',
 })

 let res1 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'delete',
     rawLongQuery: 'User?_id=0//Inventory/0',
 })

 let res2 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'giveItem',
     rawLongQuery: 'User?_id=0/inventory',
     body: {
         key: "money",
         amount: 500
     }
 })

 let res3 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'get',
     rawLongQuery: 'User?_id=0/inventory',
 })