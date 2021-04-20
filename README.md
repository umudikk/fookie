# Fookie JS
### FookieJS creates an API using JSON schema.

#### Featues
 - Write clean and less code.
 - Low test cost.
 - Default health check and metrics.
 - Create, delete or edit your API on runtime.
 - Store your schemas in database.
 - Auto generated methods (post , delete , patch , count , schema, get , getAll) 
 - Supports custom methods.
 - NoSQL and SQL support.(NoSQL is cooming soon)
 - Trim unauthorized fields.
 - Just take the fields you need. (Like a graphql) 
 - Request Life Cycle
 - Everything is a plugin.
 - Routines
 - Deafult models, rules, roles, filters, effects, modifies and methods.
## Last Version
```
-
```
## Installation
```
npm install fookie --save
```

## Documentation

https://github.com/umudikk/fookie/wiki

## Examples
```javascript
const Fookie = require("fookie")

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
                read: [],
                write: []
            },
            date: {
                unique: false,
                type: "string",
                required: true,
                input: "date",
                read: [],
                write: []
            },
            author: {
                unique: false,
                relation: {
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
                role: ["everybody"],
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

```
