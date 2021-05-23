module.exports = {
    name: 'system_submenu',
    display: "_id",
    schema: {

        system_model: {
            relation: "system_model"
        },
        system_menu: {
            relation: "system_menu"
        },
        icon: {
            input: "text",
            type: "string",
        },

    },
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            filter: [],
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