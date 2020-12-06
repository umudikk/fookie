# Auto generated RestAPI from Mongoose Schema
### Does NOT ready to product.

```javascript
import Api from './src'
import User from './src/schemas/User'
import Inventory from './src/schemas/Inventory'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'


const Blog = new mongoose.Schema({
    title: {
        type: String,
        auth: {
            get: ["everybody"],
            post: ["editor"],
            delete: ['admin'],
            patch: ['editor','admin'],
        }
    },
    text:{
        type: String,
        auth: {
            get: ["everybody"],
            post: ["editor"],
            delete: ['admin'],
            patch: ['editor','admin'],
        }
    },
    editor:{
        type: { type: Schema.Types.ObjectId, ref: 'User' }
        auth: {
            get: ["everybody"],
            post: ["admin"],
            delete: ['nobody'],
            patch: ['nobody'],
        }
    },

}, {
    versionKey: false
});

(async () => {
    const app = express()
    const API = new Api({})

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    await API.connect('mongodb://localhost:27017/API', {})

    //everybody and nobody static roles.You dont need to define.
    // define custom roles    
    API.newRole('admin', (user, document) => {
        return user.type == 'admin'
    })

    API.newRole('editor', (user, document) => {
        return user._id == document.editor ? true : false
    })

    //make model from your schemas
    API.setModel('Blog', Blog)


    app.use(async (req, res)=> {
        let user = { id: 0, type: 'admin', name: 'umut' }
        let result = await API.run(user, req.method, req.originalUrl, req.body)
        res.json(result)
    })

    app.listen(3000)
})()

```
 




