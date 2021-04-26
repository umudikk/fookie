module.exports = async function (ctx) {
    ctx.store.set("default_life_cycle_controls", {
        modifies: {
            post: {
                before: [],
                after: [],
            },
            get: {
                before: [],
                after: [],
            },
            getAll: {
                before: [],
                after: [],
            },
            patch: {
                before: [],
                after: [],
            },
            delete: {
                before: [],
                after: [],
            },
            count: {
                before: [],
                after: [],
            },
            schema: {
                before: [],
                after: [],
            },
            try: {
                after: [],
                before: [],
            },
        },
        rules: {
            post:{
                before:["has_fields","check_type",],
                after:[],
            },
            get:{
                before:["valid_attributes"],
                after:[],
            },
            getAll:{
                before:["valid_attributes"],
                after:[],
            },
            patch:{
                before:["has_fields","check_type"],
                after:[],
            },
            delete:{
                before:[],
                after:[],
            },
            count:{
                before:[],
                after:[],
            },
            schema:{
                before:[],
                after:[],
            },
            try:{
                after:[],
                before:[],
            },
        },
        filters: {
            post:{
                before:[],
                after:[],
            },
            get:{
                before:[],
                after:[],
            },
            getAll:{
                before:[],
                after:[],
            },
            patch:{
                before:[],
                after:[],
            },
            delete:{
                before:[],
                after:[],
            },
            count:{
                before:[],
                after:[],
            },
            schema:{
                before:[],
                after:[],
            },
            try:{
                after:[],
                before:[],
            },
        },
        effects: {
            post:{
                before:[],
                after:[],
            },
            get:{
                before:[],
                after:[],
            },
            getAll:{
                before:[],
                after:[],
            },
            patch:{
                before:[],
                after:[],
            },
            delete:{
                before:[],
                after:[],
            },
            count:{
                before:[],
                after:[],
            },
            schema:{
                before:[],
                after:[],
            },
            try:{
                after:[],
                before:[],
            },
        },
    })
}
