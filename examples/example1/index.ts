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
    });

    const API = new Fookie({
        register: true,
        login: true,
        cache: 0,
    })
    await API.connect('mongodb://localhost:27017/API', {})

    // ROLES

    API.newRole('system', (user, document) => {
        return user.type == 'admin'
    })

    //EFFECTS

    API.setEffect('explode', async (user, document, ctx) => {
        console.log('big explode')
    })

    //MODELS

    API.setModel('User', Player)


    //ROUTINES

    API.setRoutine('backup', 1000 * 10, async (ctx) => {
    

    })

    API.listen(9999)
})()