import Api from './src'
import User from './src/schemas/User'
import Inventory from './src/schemas/Inventory'
import * as express from 'express'
import * as bodyParser from 'body-parser'

(async () => {
    const app = express()
    const API = new Api({
        PRIVATE_KEY: process.env.PRIVATE_KEY || 'secret_key',

    })

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    await API.connect('mongodb://localhost:27017/API', {})

    //everybody and nobody static 2 role.You dont need to define.
    // define custom roles    
    API.newRole('admin', (user, model) => {
        return user.type == 'admin'
    })

    API.newRole('self', (user, model) => {
        return user._id == model.owner ? true : false
    })

    //make model from your schemas
    API.setModel('User', User)
    API.setModel('Inventory', Inventory)

    app.use(async (req, res)=> {
        let user = { id: 0, type: 'admin', name: 'umut' }
        let result = await API.run(user, req.method, req.originalUrl, req.body)
        res.json(result)
    })

    app.listen(8080)
})()










