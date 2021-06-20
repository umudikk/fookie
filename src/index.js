const express = require("express");
const bodyParser = require("body-parser");
const { hasFields, clear } = require("./helpers");
const cors = require("cors");
const mongooseModelParser = require("./helpers/mongooseModelParser");
const rule = require("./life-cycle/rule");
const effect = require("./life-cycle/effect");
const filter = require("./life-cycle/filter");
const preRule = require("./life-cycle/preRules");
const modify = require("./life-cycle/modify");
const client = require("prom-client");
const lodash = require("lodash");
const core = require("./core/index.js");
var mongoose = require("mongoose");
const deepMerge = require("deepmerge");
var { Schema } = mongoose;

class Fookie {
   constructor() {
      this.models = new Map();
      this.roles = new Map();
      this.rules = new Map();
      this.effects = new Map();
      this.routines = new Map();
      this.filters = new Map();
      this.modifies = new Map();
      this.mixins = new Map();
      this.store = new Map();

      this.helpers = {
         calcEffects,
         check,
         clear,
         hasFields,
         lodash,
         deepMerge,
      };

      const collectDefaultMetrics = client.collectDefaultMetrics;
      const Registry = client.Registry;
      const register = new Registry();
      collectDefaultMetrics({ register });

      this.app = express();
      this.app.use(cors());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      this.app.use(bodyParser.json());

      this.app.post("/", async (req, res) => {
         let payload = req.body;
         payload.req = req;
         payload.res = res;
         payload.token = req.headers.token;
         await this.run(payload);
         res.status(payload.response.status).json(payload.response.data);
      });

      this.use(core);
   }

   role(name, role) {
      this.roles.set(name, role);
   }

   mixin(name, mixin) {
      this.mixins.set(name, mixin);
   }

   rule(name, rule) {
      this.rules.set(name, rule);
   }

   filter(name, filter) {
      this.filters.set(name, filter);
   }

   modify(name, before) {
      this.modifies.set(name, before);
   }

   async model(model) {
      let parsedModel = mongooseModelParser(model);
      let Model = mongoose.model(model.name, new Schema(parsedModel));
      model.methods = new Map();
      model.methods.set("get", async function ({ query, response, attributes }) {
         let res = await Model.findOne(query.where, attributes);
         if (res) {
            response.status = 200;
         } else {
            response.status = 201;
            response.errors.push("get error");
         }
         return res;
      });
      model.methods.set("getAll", async function ({ query, attributes }) {
         let res = await Model.find(query.where, attributes);
         if (res) {
            return res;
         } else {
            return [];
         }
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
      model.methods.set("schema", async function () {
         return model;
      });
      model.methods.set("count", async function ({ query }) {
         let res = await Model.countDocuments(query.where);
         return res;
      });

      model.methods.set("test", async function (payload) {
         await payload.ctx.helpers.calcModify(payload);
         return await payload.ctx.helpers.check(payload);
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
         errors: [],
         status: 200,
         data: null,
      };
      payload.ctx = this;
      // -------------

      // -------------
      if (await calcPreRequirements(payload)) {
         for (let b of this.store.get("befores")) {
            await this.modifies.get(b)(payload);
         }
         await calcModify(payload);
         if (await check(payload)) {
            payload.response.data = await payload.ctx.models.get(payload.model).methods.get(payload.method)(payload);
            if (payload.response.status == 200) {
               await calcFilter(payload);
               calcEffects(payload);
            }
         }

         for (let b of this.store.get("afters")) {
            await this.effects.get(b)(payload);
         }
      }

      console.log(
         `[RESPONSE] ${payload.model} | ${payload.method} | [${payload.response.errors}] | ${payload.response.status}`
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
      await this.prepareDefaults();
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
