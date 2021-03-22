module.exports = {
    name: 'system_model',
    display: "name",
    schema: {
        name: {
            type: "STRING",
            input: "text",
        },
        display: {
            type: "STRING",
            input: "text",
        },
        schema: {
            type: "JSONB",
            input: "json",
            read: ["system_admin"]
        },
        fookie: {
            type: "JSONB",
            input: "json",
            read: ["system_admin"]
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