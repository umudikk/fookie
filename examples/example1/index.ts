import Fookie from '../../src'
import * as mongoose from 'mongoose'
/*
This example example makes an explosion
*/



(async () => {


    const Player = new mongoose.Schema({
        position: {
            type: Object,
            fookie: {
                get: {
                    auth: ["everybody"],
                    effect: []
                },
                post: {
                    auth: ["everybody"],
                    effect: ['explode']
                },
                delete: {
                    auth: ["everybody"],
                    effect: ["explode"]
                },
                patch: {
                    auth: ["everybody"],
                    effect: []
                }
            }



        },
        health: Number,
    },
        {
            versionKey: false
        }
    );

    const API = new Fookie({})
    await API.connect('mongodb://localhost:27017/API', {})

    API.newRole('system', (user, document) => {
        return user.type == 'admin'
    })

    API.setEffect('explode', (user, document, Models, config) => {
        console.log('big explode')
    })

    API.setModel('User', Player)

    API.listen(3000)
})()







