module.exports = {
    name: 'system_user',
    display: "email",
    schema: {
        email: {
            required: true,
            type: "string",
            input: "text",
        },
        password: {
            required: true,
            type: "string",
            input: "password",
            read: ['nobody'],
        },
        type: {
            required: true,
            type: "string",
            input: "password",
        }
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
            auth: ["system_admin"],
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