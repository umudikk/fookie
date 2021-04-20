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
        schema: {
            role: ["everybody"],
        }
    }
}