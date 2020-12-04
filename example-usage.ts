import Api from './src'
import User from './src/schemas/User'
import Inventory from './src/schemas/Inventory'
import * as express from 'express'
import * as bodyParser from 'body-parser'

(async () => {
    const app = express()
    const API = new Api({})

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    await API.connect('mongodb://localhost:27017/API', {})

    API.setRequester(User)

    //Roles
    API.newRole('admin', (user, model) => {
        return user.type == 'admin'
    })
    API.newRole('everybody', (user, model) => {
        return true
    })
    API.newRole('nobody', (user, model) => {
        return false
    })
    API.newRole('self', (user, model) => {
        return user._id == model.owner ? true : false
    })

    //Models
    API.setModel('User', User)
    API.setModel('Inventory', Inventory)

    app.use(async (req, res) => { 
        console.log(req.method);
        
        // let user = API.parseRequester(req.headers.authentication)
        let user = { id: 0, type: 'admin', name: 'umut' }
        let result = await API.run(user, req.method, req.originalUrl, req.body)
        res.json(result)
    })

    app.listen(8080)
})()










