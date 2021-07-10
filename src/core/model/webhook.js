module.exports = {
    name: "webhook",
    database:"mongoose",
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        url: {
            required: true,
            type: "string",
            input: "text"
        },
        model: {
            required: true,
            type: "string",
            input: "text"
        },
        method: {
            required: true,
            type: "string",
            input: "text",
        },
        token: {
            type: "string",
            input: "text",
        }
    },
    lifecycle: {
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
        },
        delete: {
            role: ["system_admin"],
        },
        model: {
            role: ["everybody"],
        },
    },
};
