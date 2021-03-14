module.exports = {
    name: 'system_model',
    schema: {
        schema: {
            type: "JSONB",
            fookie: {
                input: "json",
                get: {
                    auth: ['everybody'],
                },
                patch: {
                    auth: ['system_admin'],
                }
            }
        },
    },
    fookie: {
        get: {
            rule: ["check_auth"],
            modify: ["filter"]
        },
        getAll: {
            rule: ["check_auth"],
            modify: ["filter"]
        },
        patch: {
            rule: ["check_fields", "check_auth"],
            modify: ["filter"]
        },
        post: {
            rule: ["check_fields", "check_auth"],
            auth: ["everybody"],
            modify: ["filter"]
        },
        delete: {
            rule: ["check_auth"],
            auth: ["system_admin"],
        }
    }
}