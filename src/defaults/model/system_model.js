module.exports = {
    name: 'system_model',
    display: "name",
    schema: {
        name: {
            required: true,
            type: "string",
            input: "text",
        },
        display: {
            type: "string",
            input: "text",
        },
        schema: {
            required: true,
            type: "jsonb",
            input: "json",
        },
        fookie: {
            required: true,
            type: "jsonb",
            input: "json",
        },
    },
    fookie: {
        get: {
            auth: ["system_admin"],
        },
        getAll: {
            filter: ["add_static_models"],
            auth: ["system_admin"],
        },
        patch: {
            auth: ["system_admin"],
            effect: ['sync'],
        },
        post: {
            auth: ["system_admin"],
            effect: ['sync'],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["system_admin"],
        }
    }
}