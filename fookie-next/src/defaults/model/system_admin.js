module.exports = {
    name: 'system_admin',
    schema: {
        system_user: {
            type: "INTEGER",
            relation: {
                model: "system_user",
                key: "id"
            },
            read: ['everybody'],
            write: ['system'],

        },
    },
    fookie: {
        get: {
            rule: [],
            modify: [],
            auth: ["everybody"],
        },
        getAll: {
            rule: [],
            modify: [],
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
            rule: [],
            modify: []
        },
        post: {
            rule: [],
            auth: ["system"],
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