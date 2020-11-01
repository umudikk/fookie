# Auto Generated Nodejs RestAPI from Mongoose Model and Auth Object

```javascript
 const API = require('./src/api')
 const User = require('./models/User.js')
 const Inventory = require('./models/Inventory.js')

 API.connect({ url: 'mongodburl' })

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
         post: ["admin"],
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

     API.run(user, query)
 })

 API.listen(8080)


 let res0 = API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'get',
     query: 'User/0/Inventory/items',
 })

 let res1 = await API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'delete',
     query: '/User/0/Inventory/0',
 })

 let res2 = await API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'giveItem',
     query: '/User/0/inventory',
     data: {
         key: "money",
         amount: 500
     }
 })

 let res3 = await API.run({ _id: 0, name: 'umut', type: "admin" }, {
     method: 'get',
     query: 'User/0/inventory',
 })

 console.log(res0);
 console.log(res1);
 console.log(res2);
 console.log(res3);

```
 
