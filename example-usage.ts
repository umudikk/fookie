import api from './src'
import User from './src/schemas/User'
import Inventory from './src/schemas/Inventory'


(async () => {

    const API = new api({})

    await API.connect('mongodb://localhost:27017/API', {})

    API.setRequester(User)

    //Roles
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

    //Models
    API.setModel('User', User)
    API.setModel('Inventory', Inventory)

    //Event
    API.on('/run', async (req, res) => {

    })

    API.listen(8080)

    let res0 = await API.run({ _id: 0, name: 'umut', type: "admin" }, {
        method: 'get',
        query: 'http://localhost:3000/User?_id=546545'
    })
    console.log(res0);
    
})()








