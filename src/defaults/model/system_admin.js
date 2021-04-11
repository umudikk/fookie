module.exports = {
    name: 'system_admin',
    display: "name",
    schema: {
        system_user: {
            type: "integer",
            relation: {
                model: "system_user",
                key: "id"
            },
        },
    },
    fookie: {
        get: {
            role: ["system_admin", "system"],
        },
        getAll: {
            role: ["system_admin", "system"],
        },
        patch: {
            role: ["system_admin", "system"],
        },
        post: {
            role: ["system_admin", "system"],
        },
        delete: {
            role: ["system_admin", "system"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}