module.exports = {
    name: 'system_model',
    display: "name",
    schema: {
        name: {
            input: "text",
            required: true,
            type: "string",
        },
        display: {
            input: "text",
            required: true,
            type: "string",
            default: "_id",
        },
        schema: {
            input: "json",
            required: true,
            type: "object",
        },
        fookie: {
            input: "json",
            required: true,
            type: "object",
        },
    },
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {   
            role: ["everybody"],
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
            role: [],
        },
        count: {
            role: ["system_admin"],
        }
    }
}