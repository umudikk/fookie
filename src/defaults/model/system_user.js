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
            input: "text",
        }
    },
    fookie: {
        get: {
            role: ["system_admin"],
        },
        getAll: {
            role: ["system_admin"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
            modify: ["password"]
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        },
        login: {
            rule: ["has_pwemail"],
        },
        register: {
            rule: ["has_pwemail"],
        }
    }
}