module.exports = async function (ctx) {
    ctx.store.set("default_life_cycle_controls", {       
        get: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: [],
                after: [],
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
                after: [],
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
                before: [],
                after: [],
            },
            rule: {
                before: ["has_fields", "check_type","check_required"],
                after: [],
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
                before: ["get_target"],
                after: [],
            },
            rule: {
                before: ["has_fields", "check_type","check_required"],
                after: [],
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
                before: [],
                after: [],
            },
            rule: {
                before: [],
                after: [],
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
                after: [],
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
                after: [],
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
        try: {
            modify: {
                before: [],
                after: [],
            },
            rule: {
                before: ["has_fields", "check_type",],
                after: [],
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

