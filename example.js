 const MYAPI = require('./src/api')
 const User = require('./models/User.js')
 const Inventory = require('./models/Inventory.js')

 const API = new MYAPI({})
 API.connect({ url: "mongodb://localhost:26422" })
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

 API.setModel('User', {
     model: User,
     auth: {
         post: ["self"],
         get: ["everyone"],
         delete: ["admin"],

     }
 })
 API.setModel('Inventory', {
     model: Inventory,
     auth: {
         post: ["system"],
         get: ["everyone"],
         delete: ["admin", "system"],
         giveItem: ['system', "admin"]
     }
 })

 API.on('run', async(user, query) => {
     let res0 = await API.run(user, {
         method: 'delete',
         query: '/User/0/Inventory/0',
     })

     let res1 = await API.run(user, {
         method: 'giveItem',
         query: '/User/0/inventory',
         data: {
             key: "money",
             amount: 500
         }
     })

     let res2 = await API.run(user, {
         method: 'get',
         query: 'User/0/inventory',
     })
     API.run(user, query)
 })

 API.listen(8080)


 let res2 = API.run({ _id: 0, name: 'umut' }, {
     method: 'get',
     query: 'User/0/Inventory/items',
 })