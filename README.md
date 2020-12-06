# Auto generated RestAPI from Mongoose Schema
## seyitumutbicer@gmail.com
### Does NOT ready to product.

```javascript
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

    //everybody and nobody static roles.You dont need to define.
    // define custom roles    
    API.newRole('admin', (user, document) => {
        return user.type == 'admin'
    })

    API.newRole('owner', (user, document) => {
        return user._id == document.owner ? true : false
    })

    //make model from your schemas
    API.setModel('User', User)
    API.setModel('Inventory', Inventory)

    app.use(API.expressMiddleware)

    app.listen(3000)
})()

```
 
