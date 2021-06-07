module.exports = async function (ctx) {
    ctx.store.set("default_life_cycle_controls", {
        get: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: [],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: ["filter"],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        getAll: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: [],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: ["filter"],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        post: {
            modify: {
<<<<<<< HEAD
                before: ["set_target","increase"],
=======
                before: ["set_default","set_target"],
>>>>>>> f139b2b423e913c8eedd6dc4b0c7b8830e835de0
                after: [],
            },
            rule: {
                before: ["need_target", "has_fields", "check_type", "check_required"],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: ["filter"],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        patch: {
            modify: {
                before: ["set_target"],
                after: [],
            },
            rule: {
                before: ["need_target", "has_fields", "check_type", "check_required"],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: ["filter"],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        delete: {
            modify: {
                before: ["set_target"],
                after: [],
            },
            rule: {
                before: ["need_target"],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: [],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        count: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: [],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: [],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        schema: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: [],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: ["filter"],
            },
            effect: {
                before: [],
                after: [],
            },
        },
        test: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: ["has_fields", "check_type",],
                after: ["check_auth"],
            },
            filter: {
                before: [],
                after: ["filter"],
            },
            effect: {
                before: [],
                after: [],
            },
        },
    })
}

