module.exports = {
    name: 'system_model',
    display: "name",
    schema: {
        name: {
            input:"text",
            required: true,
            type: "string",
        },
        display: {
            input:"text",
            required: true,
            type: "string",
            default: "id"
        },
        schema: {
            input:"json",
            required: true,
            type: "jsonb",
        },
        fookie: {
            input:"json",
            required: true,
            type: "jsonb",
        },
    },
    fookie: {
        get: {
            role: ["system_admin"],
        },
        getAll: {
            filter: ["add_static_models"],
            role: ["system_admin"],
        },
        patch: {
            role: ["system_admin"],
            effect: ['sync'],
        },
        post: {
            role: ["system_admin"],
            effect: ['sync'],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["system_admin"],
        },
        count: {
            role: ["system_admin"],
        }
    }
}