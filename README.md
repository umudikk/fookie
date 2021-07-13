# Introduction

Fookie JS is a lifecycle-based web application development method. It does most
things automatically for your APIs. In this way, it allows you to easily make
our application with small code pieces.

## Core Features

- Write clean and less code. (%70-%90 less code.I'm not kidding.)
- Develop your application by adding small pieces of code
- Default health check
- Prometheus metric.
- Password & Email base authentication.
- Auto generated methods for every model (post , delete , patch , count , model,
  get , getAll , test)
- Huge default library like Autocode
  (mongoose,sequelize,aws-sdk,validatorjs,lodash etc.)
- Auto validate request body
- Check required,onlyClient fields in request body
- Low test cost.
- Store for your global variables.
- Create, delete or edit your API on runtime.
- Supports custom methods.
- NoSQL(MongoDB) and SQL support.(SQL is coming soon)
- Trim unauthorized fields.
- Just take the fields you need.
- Request Life Cycle
- Everything is a plugin.
- Routines (SetInterval)
- Deafult models, rules, roles, filters, effects, modifies and methods.
- Mixins (Merge two different schema. Similar to vue mixins)

## Next Features

- More metric
- Dockerizing
- Auto tests
- Client for Vue JS. Auto generated post forms, tables, kanbans, admin-panel
  like strapi.
- Media Library and ready to use streaming service.
- Auto generated documentation.
- Querystring support.
- More database support.

# Documentation

## Website

http://fookiejs.com

## Github Pages

https://umudikk.github.io/fookie/#/

## Installation

```
npm install fookie --save
```

```javascript
const Fookie = require("fookie");
const fookie = new Fookie({
  corePlugins: ["system_user", "metrics", "health_check"],
});
await fookie.connect("mongodb://localhost/fookie");

await fookie.model({
  name: "messages",
  database: "mongodb",
  schema: {
    text: {
      type: "string",
      required: true,
    },
  },
  display: "text", // useless field for serverside. i reserved this for client
  lifecycle: {
    get: {
      role: ["everybody"],
    },
    getAll: {
      role: ["everybody"],
    },
    patch: {
      role: ["system_admin"],
      effect: ["log"],
    },
    post: {
      role: ["system_admin"],
      effect: ["log"],
    },
    delete: {
      role: ["system_admin"],
    },
    model: {
      role: ["everybody"],
    },
    count: {
      role: ["system_admin"],
    },
  },
});

let res = await fookie.run({
  system: true,
  model: "message",
  method: "post",
  body: {
    message: "hi",
  },
});

console.log(res);

res = await fookie.run({
  system: true,
  model: "message",
  method: "getAll",
  query: {},
});
console.log(res);

res = await fookie.run({
  system: true,
  model: "message",
  method: "get",
  query: {
    text: "hi",
  },
});
console.log(res);

res = await fookie.run({
  system: true,
  model: "message",
  method: "count",
  query: {
    text: "hi",
  },
});
console.log(res);

res = await fookie.run({
  system: true,
  model: "message",
  method: "test",
  query: {
    text: "hi",
  },
});
console.log(res);

res = await fookie.run({
  system: true,
  model: "patch",
  method: "test",
  query: {
    text: "hi",
  },
  body: {
    text: "Hello World!",
  },
});
console.log(res);

res = await fookie.run({
  system: true,
  model: "patch",
  method: "delete",
  query: {
    text: "Hello World!",
  },
});
console.log(res);

fookie.listen(3000);
```
