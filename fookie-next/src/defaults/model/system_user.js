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
            read: ['nobody'],
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
            modify: [],
            before: ["password"]
        },
        delete: {
            rule: [],
            auth: ["system_admin"],
        },
        options: {
            auth: ["everybody"],
            modify: []
        },
        random: {
            auth: ["everybody"],
        }
    }
}