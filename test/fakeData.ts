import * as faker from 'faker'
import userSchema from '../src/schemas/User'
import inventorySchema from '../src/schemas/Inventory'
import * as mongoose from 'mongoose'

(async () => {

    await mongoose.connect('mongodb://localhost:27017/API')

    const User = mongoose.model('User', userSchema)
    const Inventory = mongoose.model('Inventory', inventorySchema)

    for (let i = 0; i < 10; i++) {
        let tmpUser = new User({
            name: faker.name.findName(),
            mail: faker.internet.email(),
            password: faker.internet.password(),
        })

        let usr = await tmpUser.save()

        let tmpInventory = new Inventory({
            owner: usr._id,
            items: []
        })
        let inv = await tmpInventory.save()

        for (let i = 0; i < 2; i++) {
            inv['giveItem']({
                key: faker.random.word(),
                amount: faker.random.number()
            })
        }
        await inv.save()
    }
})()


