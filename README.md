# Fookie JS

### FookieJS creates an API using JSON schema in seconds.

While developing software, I realized that we always do the same work in controllers and routes, and I decided to automate this layer. Fookie JS automatically does whatever is required in an api. You developers only focus on feature development.

#### Featues

-  Write clean and less code. (%70-%90 less code.I'm not kidding.)
-  Develop your application by adding small pieces of code
-  Auto generated methods (post , delete , patch , count , schema, get , getAll , test)
-  Huge default library like Autocode (mongoose,sequelize,aws-sdk,validatorjs,lodash etc.)
-  Auto validate request body
-  Check required,onlyClient fields in request body
-  Low test cost.
-  Default health check and metrics.
-  Store for your global variables.
-  Password email base authentication.
-  Create, delete or edit your API on runtime.
-  Supports custom methods.
-  NoSQL and SQL support.(SQL is coming soon)
-  Trim unauthorized fields.
-  Just take the fields you need. (Like a graphql)
-  Request Life Cycle
-  Everything is a plugin.
-  Routines
-  Deafult models, rules, roles, filters, effects, modifies and methods.
-  Mixins (Merge two different schema. Similar to vue mixins)

#### Next Features

-  Default metrics
-  Dockerizing
-  Auto tests
-  Client for Vue.Auto generated post forms, tables, kanbans, admin-panel like strapi.
-  Media Library and ready to use streaming service.
-  Auto generated documentation.
-  Querystring support.
-  More database support.

## Installation

```
npm install fookie --save
```

## Documentation

https://github.com/umudikk/fookie/wiki

## Fookie JS Manifest

// To do

## Examples

### Blog

```javascript
const Fookie = require("fookie");

let start = async function () {
   const api = new Fookie();
   await api.connect("mongodb://db/test");
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
         },
         content: {
            unique: true,
            input: "rich",
            type: "string",
            required: true,
            default: "Content here...",
         },
         slug: {
            unique: true,
            input: "text",
            type: "string",
            required: false,
         },
         date: {
            unique: false,
            type: "string",
            required: true,
            input: "date",
         },
         author: {
            unique: false,
            relation: "system_user",
            default: 1,
            required: true,
         },
         published: {
            unique: false,
            type: "boolean",
            required: true,
            input: "date",
            default: false,
            read: ["system_admin"],
            write: ["system_admin"],
         },
      },
      gateway: {
         get: {
            role: ["everybody"],
         },
         getAll: {
            role: ["system_admin", "everybody"],
            reject: {
               system_admin: ["paginate", "published"],
            },
            rule: ["has_page"],
         },
         patch: {
            role: ["system_admin", "editor"],
         },
         post: {
            role: ["system_admin", "editor"],
         },
         delete: {
            role: ["system_admin"],
         },
         schema: {
            role: ["everybody"],
         },
      },
      mixin: [],
   });

   api.use((ctx) => {
      ctx.store.set("per_page_count", 12);
   });

   api.rule("has_page", async ({ user, req, body, options, model, query, method }, ctx) => {
      return typeof options.page == "number";
   });

   api.modify("paginate", async ({ user, req, body, options, model, query, method }, ctx) => {
      let count = ctx.store.get("per_page_count");
      projection.skip = count * options.page;
      projection.limit = count;
   });

   api.modify("published", async ({ user, req, body, model, options, query, method }, ctx) => {
      query.published = true;
   });

   api.routine("hello", 1000 * 10, async (ctx) => {
      console.log("hello");
   });

   api.role("editor", async (payload, ctx) => {
      if (user.type) {
         return user.type == "editor";
      }
   });

   api.routine("backup", 1000 * 60, async (ctx) => {
      console.log("backup");
   });

   api.listen(8080);
};

start();
```

## TODO App

```javascript
const Fookie = require("fookie");
(async () => {
   const fookie = new Fookie();
   await fookie.connect("mongodb://localhost/fookie");

   fookie.model({
      name: "todo",
      display: "title",
      schema: {
         title: {
            type: "string",
         },
         content: {
            type: "string",
         },
         assignee: {
            relation: "system_user",
         },
         checked: {
            type: "boolean",
            default: false,
         },
      },
      gateway: {
         get: {
            role: ["loggedin"],
         },
         getAll: {
            role: ["loggedin"],
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
         model: {
            role: ["everybody"],
         },
      },
   });

   fookie.listen(8080);
   setTimeout(async () => {
      // We need set time because.Fookie didnt set all plugins.1 sec is enought.
      let res = await fookie.run({
         system: true,
         model: "system_user",
         method: "login",
         body: {
            email: "admin",
            password: "admin",
         },
      });
      let token = res.data; // You are system_admin now. (email:admin,password:admin default system_admin)
      res = await fookie.run({
         token,
         model: "todo",
         method: "getAll",
         query: {
            checked: false,
         },
      });

      console.log(res); // {warnings:[],data:[....],status:200}
   }, 1000);
})();
```

# Basics

## Model

database -> system_model

```javascript
{
    name:"blog_post", // this is your model name.Similar with Table name.
    display:"title", // this is useless for fookiejs, for client
    schema:{...},
    mixin:["model2"],
}
```

##### Field

Orm schema.You can add some extra custom keys here.

```javascript
{//model def
    ...
    ...
    schema:{
        field1:{
            type:"number" , // "string" , "number" , "object" , "boolean",
            onlyClient:true, // same with required but data must be in request body.
            min:0 // only number
            max:12, // only number
            equal:5, //
            includes:"asd", // for string and array
            write:[], // Role array. for patch post defalut:[]
            read:["nobody"],// Role array. Who can read this field ? Nobody.FookieJS trim this field when you want to read(get getALl etc.). defalut:[]
            input:"color",//this is useless for fookie backend but You can use on client-side
            },
            relation:"system_user"// same with referance
    }
}
```

##### gateway

what your app does is determined here.You can think of this as a request gateway.All of the rules must return true to continue. Otherwise, the request return warnings. But if only one role is correct, you will continue to do the operation. Let's say you wrote a reject function for a role. If the user is not in this role. It works as if it were true, but the reject functions written for that role are executed and the process continues.

```javascript
{
name:".."
...
gateway:{
    post:{
        preRule:[]
        role:["loggedin"]// Who can make this?Loggedin.
        reject:{//
            loggedin:["add_something_to_query_modify"] // If requester is not loggedin Make this MODIFY.
        }
    }
}

}
```

# PLUGIN

```javascript
fookie.use(async (ctx)=>{ // ctx = fookie
    ctx.model({
        name:"bar",
        ...
        schema:{...}
    }),
    ctx.routine('hi',1000,()=>{
    console.log("hi")

    })
    ctx.rule("nobody",async ()=>{
       return false
    })
     ctx.modify("version_safe",async (payload,ctx)=>{
       payload.query.__v = ctx.version // mongoose schema version __v
    })
    ctx.filter("foo",(payload,ctx)=>{...})
    let model = ctx.models.get("store")
    model.methods.set("set",(payload,ctx)=>{
        ctx.store.set(payload.options.key,payload.body)
    })
    model.methods.set("get",(payload,ctx)=>{
        return xtx.store.get(payload.options.key)
    })
})
```

# Payload

Payload is very important because.All fucntions( like rule role filter etc. etc. but not model) get this parameter

```javascript

payload = {
    token:"...",
    system:true //admin. YOu cant add this field http request :).
    user:{_id:"somemongooseID",email:"example@example.com"},
    req:req, // ExpressJS request. If you are using fookie.listen(port)
    method:"patch",
    model:"system_user",
    query:{
        $eq:{
            _id:"...someid",
        }
    },
    body:{
        password:"123",
    },
    options:{
        simplified:false // like grpc simplified gives very small data but you need to use fookie-client-sdk return an array
    }
}
fookie.run(payload)


// Usage

fookie.effect('send_email',async function(payload,ctx){
    mockMailer(payload.body)
})
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

                id:{
                    $gt:4,
                    $lt:100,
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
    model.methods.set("test",function(payload,ctx)){ // payload {user,method,body,options,query,ctx}
       await this.helpers.calcModify(payload,ctx)
            return await this.helpers.check(payload,ctx)
    })
})

```
