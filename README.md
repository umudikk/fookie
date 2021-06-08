# Fookie JS
### FookieJS creates an API using JSON schema in seconds.
While developing software, I realized that we always do the same work in controllers and routes, and I decided to automate this layer. Fookie JS automatically does whatever is required in an api. You developers only focus on feature development.
#### Featues
 - Write clean and less code. (%70-%90 less code.I'm not kidding.)
 - Request body type check
 - Request body require fields check
 - Low test cost.
 - Default health check and metrics.
 - Store for your global variables.
 - Password email base authentication.
 - Create, delete or edit your API on runtime.
 - Store your schemas in database.
 - Auto generated methods (post , delete , patch , count , schema, get , getAll) 
 - Supports custom methods.
 - NoSQL and SQL support.(SQL is coming soon)
 - Trim unauthorized fields.
 - Just take the fields you need. (Like a graphql) 
 - Request Life Cycle
 - Everything is a plugin.
 - Routines
 - Deafult models, rules, roles, filters, effects, modifies and methods.
 - Mixins (Merge two different schema. Similar to vue mixins)

#### Next Features
- Default metrics
- Dockerizing 
- Auto tests 
- Client for Vue.Auto generated post forms, tables, kanbans, admin-panel like strapi.
- Media Library and ready to use streaming service.
- Optional socket support. 
- Auto generated documentation.
- Querystring support.
- Advance and editable Request Life Cycle.
- TypeORM and TS Support.



## Installation
```
npm install fookie --save
```

## Documentation

https://github.com/umudikk/fookie/wiki

## Fookie JS Manifest
 // To do

## Examples
```javascript
const Fookie = require("fookie")

let start = async function() {
    const api = new Fookie()
    await api.connect("mongodb://db/test")
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
                default:1,
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
                role: ["system_admin","everybody"],
                reject:{
                    system_admin:["paginate", "published"]
                },
                modify: [],
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
        },
        mixin:[],
    })


    api.use((ctx) => {
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


```javascript

//Example Request

await axios.post("http://localhost:80808", 
    {
        body:{
            title:"Post 1",
            author:1
            content:"<html>test</html>",
            published:true,
            date:"07-04-2021",
            slug:"post-1"
        },
        method:"post",
        model:"blog",
        options:{},
    }
)

await axios.post("http://localhost:80808", 
    {
        body:{
           page:1
        },
        method:"getAll",
        model:"blog",
    }
)

await axios.post("http://localhost:80808", 
    {
        method:"getAll",
        model:"system_model",
        options:{
            attributes:["title","date"] //get title and date fields only
            deep:true // Populate all fields 
        },
        query:{
            where:{
                id:{
                    $gt:4,
                    $lt:100,
                }
            }
        }
    }
)


await axios.post("http://localhost:80808", 
    {
        body:{
            email:"example@example.com",
            password:"example",
        },
        method:"login",
        model:"system_user",
    }
)

await axios.post("http://localhost:80808", 
    {
        body:{
            email:"example@example.com",
            password:"example",
        },
        method:"register",
        model:"system_user",
    }
)

await axios.post("http://localhost:80808", 
        method:"schema",
        model:"system_user",
    }
)


```


### How to add custom methods

```javascript 

// Test method for can you make this request?.

api.use((ctx)=>{
    let model = ctx.models.get("system_model")
    model.methods.set("test",function(payload)){ // payload {user,method,body,options,query,ctx}
       await payload.ctx.helpers.calcModify(payload)
            return await payload.ctx.helpers.check(payload)
    })
})

```
