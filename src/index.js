const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongooseModelParser = require("./helpers/mongooseModelParser");
const schemaFixer = require("./helpers/schema_fixer.js");
const rule = require("./life-cycle/rule.js");
const effect = require("./life-cycle/effect.js");
const filter = require("./life-cycle/filter.js");
const preRule = require("./life-cycle/preRule.js");
const modify = require("./life-cycle/modify.js");
const client = require("prom-client");
const lodash = require("lodash");
const core = require("./core/index.js");
var mongoose = require("mongoose");
const deepMerge = require("deepmerge");
var { Schema } = mongoose;

class Fookie {
   constructor() {
      this.models = new Map();
      this.rules = new Map();
      this.roles = new Map();
      this.effects = new Map();
      this.routines = new Map();
      this.filters = new Map();
      this.modifies = new Map();
      this.mixins = new Map();
      this.store = new Map();

      this.helpers = {
         rule,
         effect,
         filter,
         preRule,
         modify,
         lodash,
         deepMerge,
      };

      this.app = express();
      this.app.use(cors());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(bodyParser.json());

      this.app.post("/", async (req, res) => {
         let payload = req.body;
         if (payload.user || payload.system) return false;
         if (!payload.token && req.headers.token) payload.token = req.headers.token;
         await this.run(payload, this);
         res.status(payload.response.status).json(payload.response.data);
      });

      this.use(core);
   }

   mixin(name, mixin) {
      this.mixins.set(name, mixin);
   }

   rule(name, rule) {
      this.rules.set(name, rule);
   }

   role(name, role) {
      this.roles.set(name, role);
   }

   filter(name, filter) {
      this.filters.set(name, filter);
   }

   modify(name, before) {
      this.modifies.set(name, before);
   }

   async model(model) {
      schemaFixer(model);
      let parsedSchema = mongooseModelParser(model);

      let Model = mongoose.model(model.name, new Schema(parsedSchema));
      model.methods = new Map();
      model.methods.set("get", async function (payload, ctx) {
         let res = await Model.findOne(payload.query, payload.attributes);
         if (res) {
            payload.response.status = 200;
         } else {
            payload.response.status = 201;
            payload.response.warnings.push("get error");
         }
         return res;
      });
      model.methods.set("getAll", async function ({ query, response, attributes }) {
         let res = await Model.find(query, attributes);
         if (res) {
            response.status = 200;
         } else {
            response.status = 201;
            response.warnings.push("getAll error");
         }
         return res;
      });
      model.methods.set("post", async function ({ body, target }) {
         for (let f in body) {
            target[f] = body[f];
         }
         let res = await target.save();
         return res;
      });
      model.methods.set("delete", async function ({ target }) {
         return await target.remove();
      });
      model.methods.set("patch", async function ({ body, target }) {
         for (let f in body) {
            target[f] = body[f];
         }
         return await target.save();
      });
      model.methods.set("model", async function () {
         return model;
      });
      model.methods.set("count", async function ({ query }) {
         let res = await Model.countDocuments(query);
         return res;
      });

      model.methods.set("test", async function (payload, ctx) {
         //todo fix here
         await modify(payload, ctx);
         return await rule(payload, ctx);
      });

      model.model = Model;
      this.models.set(model.name, model);
      return model;
   }

   async effect(name, effect) {
      this.effects.set(name, effect);
   }

   async run(payload) {
      payload.response = {
         warnings: [],
         status: 200,
         data: null,
      };
      let ctx = this;
      if (await preRule(payload, ctx)) {
         for (let b of this.store.get("befores")) {
            await this.modifies.get(b)(payload, ctx);
         }
         await modify(payload, ctx);
         if (await rule(payload, ctx)) {
            payload.response.data = await this.models.get(payload.model).methods.get(payload.method)(payload, ctx);
            if (payload.response.status == 200) {
               await filter(payload, ctx);
               effect(payload, ctx);
            }
         }
         for await (let b of this.store.get("afters")) {
            await this.effects.get(b)(payload, ctx);
         }
      }

      console.log(
         `[RESPONSE] ${payload.model} | ${payload.method} | [${payload.response.warnings}] | ${payload.response.status}`
      );
      return payload.response;
   }

   routine(name, time, func) {
      let routine = setInterval(() => {
         func(this);
      }, time);
      this.routines.set(name, routine);
   }

   async connect(url, config) {
      await mongoose.connect(url, config);
   }

   async use(cb) {
      await cb(this);
   }

   listen(port) {
      this.app.listen(port, () => {
         console.log(`FOOKIE ${port} is listening...`);
      });
   }
}

module.exports = Fookie;
