module.exports = {
    name: 'system_admin',
    display: "name",
    schema: {
        system_user: {
            type: "INTEGER",
            relation: {
                model: "system_user",
                key: "id"
            },
        },
    },
    fookie: {
        get: {
            auth: ["system_admin", "system"],
        },
        getAll: {
            auth: ["system_admin", "system"],
        },
        patch: {
            auth: ["system_admin", "system"],
        },
        post: {
            auth: ["system_admin", "system"],
        },
        delete: {
            auth: ["system_admin", "system"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}