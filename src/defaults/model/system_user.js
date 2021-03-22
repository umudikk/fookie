module.exports = {
    name: 'system_user',
    display: "email",
    schema: {
        email: {
            type: "STRING",
            input: "text",
        },
        password: {
            type: "STRING",
            input: "password",
            read: ['nobody'],
        },
    },
    fookie: {
        get: {
            auth: ["system_admin"],
        },
        getAll: {
            auth: ["system_admin"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system", "system_admin"],
            modify: ["password"]
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        },
        login: {
            rule: ["has_pwemail"],
        },
        register: {
            rule: ["has_pwemail"],
        }
    }
}