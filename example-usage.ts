import api from './src'
import User from './src/schemas/User'
import Inventory from './src/schemas/Inventory'


(async () => {

    const API = new api({})

    await API.connect('mongodb://localhost:27017/API', {})

    API.setRequester(User)

    //Roles
    API.newRole('admin', (user, model) => {
        return user.type == 'admin'
    })

    API.newRole('everyone', (user, model) => {
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

    API.listen(8080)

    let res0 = await API.run({ _id: 0, name: 'umut', type: "admin" }, {
        method: 'get',
        query: 'http://localhost:3000/User?_id=546545'
    })

})()








