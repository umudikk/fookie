const Fookie = require("../src/index")

let start = async function() {
    const api = new Fookie()
    await api.connect("postgres://postgres:123@127.0.0.1:5432/test")
    api.model({
        name: "blog",
        display: "title",
        schema: {
            title: {
                unique: true,
                input: "text",
                type: "string",
                required: true,
                default: "A Title",
                read: [],
                write: []
            },
            content: {
                unique: true,
                input: "rich",
                type: "string",
                required: true,
                default: "Content here...",
                read: [],
                write: []
            },
            slug: {
                unique: true,
                input: "text",
                type: "string",
                required: false,
                default: "Slug...",
                read: [],
                write: []
            },
            date: {
                unique: false,
                type: "string",
                required: true,
                input: "date",
                default: "Content here...",
                read: [],
                write: []
            },
            author: {
                unique: false,
                realtion: {
                    model: "system_user",
                    key: "id"
                },
                required: true,
                read: [],
                write: []
            },
            published: {
                unique: false,
                type: "boolean",
                required: true,
                input: "date",
                default: false,
                read: [],
                write: ["system_admin"]
            },
        },
        fookie: {
            get: {
                effect: [],
                filter: [],
                role: ["system_admin"],
                modify: [],
                rule: []
            },
            getAll: {
                effect: [],
                filter: [],
                role: ["everybody"],
                modify: ["paginate", "published"],
                rule: ["has_page"]
            },
            patch: {
                effect: [],
                filter: [],
                role: ["system_admin", "editor"],
                modify: [],
                rule: []
            },
            post: {
                effect: [],
                filter: [],
                role: ["system_admin", "editor"],
                modify: [],
                rule: []
            },
            delete: {
                effect: [],
                filter: [],
                role: ["system_admin"],
                modify: [],
                rule: []
            },
            schema: {
                effect: [],
                filter: [],
                role: ["everybody"],
                modify: [],
                rule: []
            }
        }
    })


    api.set((ctx) => {
        ctx.store.set("per_page_count", 12)
    })

    api.rule("has_page", async({ user, req, body, options, model, query, method, ctx }) => {
        return typeof body.page == "number"
    })

    api.modify("paginate", async({ user, req, body, options, model, query, method, ctx }) => {
        let count = ctx.store.get("per_page_count")
        query.offset = count * body.page
        query.limit = count
    })


    api.modify("published", async({ user, req, body, model, options, query, method, ctx }) => {
        query.where.published = true
    })

    api.routine("hello", 1000 * 10, async(ctx) => {
        console.log("hello");
    })

    api.role("editor", async(user, method) => {
        if (user.type) {
            return user.type == "editor"
        }
    })

    api.routine("backup", 1000 * 60, async(ctx) => {
        console.log("backup");
    })

    api.listen(8080)
}

start()