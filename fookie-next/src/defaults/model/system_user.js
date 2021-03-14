module.exports = {
    name: 'system_user',
    schema: {
        email: {
            type: "STRING",
            input: "text",
            read: ['everybody'],
            write: ['everybody'],


        },
        password: {
            type: "STRING",
            input: "password",
            read: ['everybody'],
            write: ['everybody'],
        },
    },
    fookie: {
        get: {
            auth: ["everybody"],
            rule: [],
            modify: []
        },
        getAll: {
            auth: ["everybody"],
            rule: [],
            modify: []
        },
        patch: {
            auth: ["everybody"],
            rule: [],
            modify: []
        },
        post: {
            rule: [],
            auth: ["everybody"],
            modify: []
        },
        delete: {
            rule: [],
            auth: ["system_admin"],
        },
        options: {
            auth: ["everybody"],
            modify: []
        }
    }
}