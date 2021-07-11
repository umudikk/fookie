# Introduction

Fookie JS is a lifecycle-based web application development method. It does most things automatically for your APIs. In this way, it allows you to easily make our application with small code pieces.

## Core Features
-  Write clean and less code. (%70-%90 less code.I'm not kidding.)
-  Develop your application by adding small pieces of code
-  Auto generated methods (post , delete , patch , count , schema, get , getAll , test)
-  Huge default library like Autocode (mongoose,sequelize,aws-sdk,validatorjs,lodash etc.)
-  Auto validate request body
-  Check required,onlyClient fields in request body
-  Low test cost.
-  Store for your global variables.
-  Create, delete or edit your API on runtime.
-  Supports custom methods.
-  NoSQL(MongoDB) and SQL support.(SQL is coming soon)
-  Trim unauthorized fields.
-  Just take the fields you need.
-  Request Life Cycle
-  Everything is a plugin.
-  Routines (SetInterval)
-  Deafult models, rules, roles, filters, effects, modifies and methods.
-  Mixins (Merge two different schema. Similar to vue mixins)

## Core Plugins
- Default health check and Prometheus metric.
- Password & Email base authentication.

## Next Features
-  More metric
-  Dockerizing
-  Auto tests
-  Client for Vue JS. Auto generated post forms, tables, kanbans, admin-panel like strapi.
-  Media Library and ready to use streaming service.
-  Auto generated documentation.
-  Querystring support.
-  More database support.

# Get Started

## Installation

```
npm install fookie --save

```
```javascript

const fookie = new Fookie({
   corePlugins:["system_user","metrics","system_file"]
});
await fookie.connect("mongodb://db/test");
fookie.model({
   name:"message",// collection name
   display:"text", // for client
   schema:{
      text:{
         unique:false,
         type:"string",
         required:true
      }
   },
   lifecycle:{
      post:{
         role:["system_admin"]
      },
      patch:{
         role:["system_admin"]
      },
      delete:{
         role:["nobody"]
      },
   },
   mixin:[]
      })
await fookie.listen(8080)
```

# Life Cycle

![image info](https://raw.githubusercontent.com/umudikk/fookie/main/docs/images/lifecycle.png)


This thing, which seems complicated, is actually very simple. I liken it to belts in factories. Many functions work in order and they change the payload little by little. The rules test the accuracy of this payload. Now let's examine all the steps one by one.

## preRule
It is an array of asynchronous functions. If all of them return true, the next step is passed. Here, some of the functions are added by fookiejs. Others are determinete in your the model.lifecycle.

```javascript

//is Email
fookie.rule("is_email",async function(payload,ctx){
/*
payload:{
token:"asd.asd.asd",
model:"system_user",
method:"post",
body:{
   email:"mockmail@mocksite.com",
   password:"rawPassword"
   }
}
*/ 
return ctx.validator.isEmail(payload.body.email) // validatorjs is in default library. 
})

```
## Modify

Modifiers are functions that manipulate payload. There is no need to return anything. They work by reference.

```javascript
//set_version
fookie.modify("set_version",async function(payload,ctx){
/*
payload:{
token:"asd.asd.asd",
model:"system_user",
method:"patch",
query:{ 
},
body:{
   email:"newEmail@mocksite.com",
   }
}
*/
payload.body.__v = ctx.package.version // package.json
})




```
## Role

role have to return boolean. when returned false a role, modifies run and manipulate the paylod. This is necessary for security. For example, if a user is not an admin, you do not want to give all the data and you make paging.

```javascript

fookie.model({
   name:"blog_post",
   schema:{
      title:{
         type:"string"
      },
      context:{
         type:"string"
      },
      published:{
         type:"boolean"
      },
   },
   lifecycle:{
      getAll:{
         role:["system_admin","everybody"],
         reject:{
            system_admin:["pagination"]
         }
      }
   }
})
fookie.modify("pagination",async function(payload,ctx){
   payload.projection.limit = 16 
   payload.projection.skip = payload.options.page 
   payload.query.published = true
})

//is user a admin?
fookie.role("system_admin",async function(payload,ctx){
   let res = await ctx.run({
      system:true,
      method:"count",
      model:"system_admin",
      query:{
         _id:payload.user._id
      }
   })
   return res.data > 0
})

fookie.role("everybody",async function(payload,ctx){
  return true
})

fookie.role("nobody",async function(payload,ctx){
  return false
})

```

## Rule
It is an array of asynchronous functions. If all of them return true, the next step is passed. Here, some of the functions are added by fookiejs. Others are determinete in your the model.lifecycle.

```javascript
fookie.store.set("register",false)
fookie.store.set("login",true)

fookie.rule("allow_register",async function(payload,ctx){
  return ctx.store.get("register")
})

fookie.rule("allow_login",async function(payload,ctx){
  return ctx.store.get("login")
})

```
## Filter

Same with modifies but works after database processing. It is used to change the information that will be returned to response.

```javascript

fookie.filter("change_id",async function(payload,ctx){
  payload.response.data.id =  payload.response.data._id
   payload.response.data._id = undefined
})

```
## Effect

Once the data reaches the user, it works asynchronously. It is used for tasks such as sending e-mails and calculating metrics.

```javascript

fookie.effect("log",async function(payload,ctx){
  console.log(payload.response.status , payload.response.warnings)
})

fookie.effect("send_email",async function(payload,ctx){
   let transporter = ctx.nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
         user: testAccount.user, 
         pass: testAccount.pass, 
      },
  });

  let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', 
      to: "bar@example.com, baz@example.com", 
      subject: "Created ✔", 
      text: payload.body._id + "is created", 
      html: "<b>Hello world?</b>", 
  });

  console.log(info)
})

```
# Plugins

Fookie JS is designed to be developed with plugins. Many features that come with fookie js are actually core plugins.

## Write PLugin

```javascript

fookie.use(async function(ctx){

   ctx.model(...)
   ctx.rule("..",async (payload,ctx)=>{})
   ctx.role("..",async (payload,ctx)=>{})
   ctx.effect("..",async (payload,ctx)=>{})
   ctx.store.set("pagination_page_limit",16)   
   ctx.routine("cpu",30*1000,async function(ctx){
      console.log("cpu_usage")
   })
   ctx.rules.get("check_type")
   ctx.rules.get("check_require")
   ctx.rules.get("only_client")
   let postFunc = ctx.models.get("modelName").methods.get("post")

   ctx.app.get("/metrics", async (req, res) => {
        res.status(200).json(await ctx.prometheus.register.metrics())
    })

})

```
## Core Plugins

### System User

##### login
```javascript

fookie.run({
   method:"login",
   model:"system_user",
   body:{
      email:"admin",
      password:"admin"
   }
})

```
##### register

```javascript

fookie.run({
   method:"register",
   model:"system_user",
   body:{
      email:"example@example.com",
      password:"pwpwpwpw"
   }
})

```

### Health Check

It is used to check the health status of your http server. This is a core plugin.

```javascript

const fookie = new Fookie({
   corePlugins:["health_check"]
})

// localhost:3000/health_check <- GET
// {status:200,data:{ok:true}}

```

### Metric

```javascript
const fookie = new Fookie({
   corePlugins:["metrics"]
})

// localhost:3000/metrics <- GET
// # <metric_name> val
```

# Test


## Unit testing

```javascript
//todo 
```

## Fuzzer

Fookie JS can test your application with automatically generated random requests. This feature is under development and if you use it in production, there may be cases of data loss.

```javascript
    fookie.fuzzer(500000)
```

# Examples

## Blog

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
      lifecycle: {
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
      lifecycle: {
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
### FookieJS creates an API using JSON schema in seconds.






## Fookie JS Manifest

// To do

# Basics

## Model

```javascript
{
    name:"blog_post", // this is your model name.Similar with Table name.
    database:"mongodb",
    display:"title", // this is useless for fookiejs, for client
    schema:{...},
    lifecycle:{...},
    mixin:["model2"],
}
```

## lifecycle

The most important part in Fookie JS. How the application will work is defined here.

```javascript
{
    name:"blog_post", // this is your model name.Similar with Table name.
    database:"mongodb",
    display:"title", // this is useless for fookiejs, for client
    schema:{...},
    lifecycle:{
       methodName:{         
         preRule:[],
         modify:[],
         role:["system_admin","everybody"],
         reject:{
            system_admin:["add_pagination","modify2"]
         },
         resolve:{
            everybody:["modify3"]       
         },
          rule:[],
          filter:[],
          effect:[],
       },
       modelName2:{...}, 
      modelName3:{...}, 
    },
    mixin:["schema2"],
}
```
## Field

Orm schema.You can add some extra custom keys here.

```javascript
{//model def
    ...
    ...
    schema:{
        field1:{
            type:"number" , // "string" , "number" , "object" , "boolean",
            onlyClient:true, // same with required but data must be in request body.
            required:true,
            unique:false,
            min:0, // only number
            max:12, // only number
            equal:5, //
            includes:"asd", // for string and array
            write:[], // Role array. for patch post defalut:[]
            read:["nobody"],// Role array. Who can read this field ? Nobody.FookieJS trim this field when you want to read(get getALl etc.). defalut:[]
            input:"color",//this is useless for fookie backend but You can use on client-side
            },
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
