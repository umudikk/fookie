module.exports = async function (ctx) {
   ctx.store.set("secret", "secret");
   ctx.store.set("afters", ["metric","log"]);
   ctx.store.set("befores", ["metric","default_payload", "set_user"]);

   // MIXIN
   ctx.mixin("default_mixin",require("./mixin/default_mixin"))

   //MODELS
   ctx.model(require("./model/system_model.js"));
   ctx.model(require("./model/system_menu.js"));
   ctx.model(require("./model/system_submenu.js"));
   ctx.model(require("./model/system_admin.js"));
   ctx.model(require("./model/webhook.js"));

   // IMPORTANT PLUGINS
   await ctx.use(require("../helpers/after_before_calculater"));
   await ctx.use(require("./plugin/health_check"));
   await ctx.use(require("../helpers/default_life_cycle_controls"));
   await ctx.use(require("./plugin/first_of_all"));

   //RULES
   ctx.rule("has_fields", require("./rule/has_fields"));
   ctx.rule("check_required", require("./rule/check_required"));
   ctx.rule("only_client", require("./rule/only_client"));
   ctx.rule("has_pwemail", require("./rule/has_pwemail"));
   ctx.rule("check_type", require("./rule/check_type"));
   ctx.rule("check_auth", require("./rule/check_auth"));
   ctx.rule("valid_attributes", require("./rule/valid_attributes"));
   ctx.rule("need_target", require("./rule/need_target"));
   ctx.rule("has_model", require("./rule/has_model"));
   ctx.rule("has_method", require("./rule/has_method"));
   ctx.rule("has_body", require("./rule/has_body"));
   ctx.rule("need_method_in_options", require("./rule/need_method_in_options"));
   ctx.rule("valid_payload", require("./rule/valid_payload"));
   ctx.rule("field_control", require("./rule/field_control"));
   ctx.rule("unique", require("./rule/unique"));

   //ROLES
   ctx.role("loggedin", require("./role/loggedin"));
   ctx.role("everybody", require("./role/everybody"));
   ctx.role("nobody", require("./role/nobody"));
   ctx.role("system_admin", require("./role/system_admin"));
   ctx.role("system", require("./role/system"));

   //EFFECT
   ctx.effect("sync", require("./effect/sync"));
   ctx.effect("webhook", require("./effect/webhook"));
   ctx.effect("log", require("./effect/log"));
   ctx.effect("metric", require("./effect/metric"));

   //FILTERS
   ctx.filter("filter", require("./filter/filter"));
   ctx.filter("simplified", require("./filter/simplified"));

   //MODIFIES
   ctx.modify("password", require("./modify/password"));
   ctx.modify("set_default", require("./modify/set_default"));
   ctx.modify("set_target", require("./modify/set_target"));
   ctx.modify("set_user", require("./modify/set_user"));
   ctx.modify("default_payload", require("./modify/default_payload"));
   ctx.modify("increase", require("./modify/increase"));
   ctx.modify("attributes", require("./modify/attributes"));
   ctx.modify("version", require("./modify/version"));
   ctx.modify("metric", require("./modify/metric"));



   // PLUGINS
   //await ctx.use(require("./defaults/plugin/file_storage"))
   await ctx.use(require("./plugin/metric/index"));
   await ctx.use(require("./plugin/system_user"));
};
