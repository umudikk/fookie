module.exports = {
    name: 'system_function_type',
    display: "name",
    schema: {
        name: {
            required: true,
            type: "string",
            input: "text",
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
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        },
        count: {
            role: ["system_admin"],
        }
    }
}