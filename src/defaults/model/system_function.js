module.exports = {
    name: 'system_function',
    display: "name",
    schema: {
        name: {
            required: true,
            type: "string",
            input: "text",
        },
        function: {
            required: true,
            type: "function",
            input: "function",
        },
        function_type: {
            required: true,
            relation: "function_type",
            type: "_id",
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