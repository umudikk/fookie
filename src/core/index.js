module.exports = async function (ctx) {
   ctx.store.set("secret", "secret");
   ctx.store.set("afters", []);
   ctx.store.set("befores", ["default_payload", "set_user"]);

   // IMPORTANT PLUGINS
   await ctx.use(require("./plugin/after_before_calculater"));
   await ctx.use(require("./plugin/health_check"));
   await ctx.use(require("./plugin/default_life_cycle_controls"));

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

   //ROLES
   ctx.role("everybody", require("./role/everybody"));
   ctx.role("nobody", require("./role/nobody"));
   ctx.role("system_admin", require("./role/system_admin"));
   ctx.role("system", require("./role/system"));

   //EFFECT
   ctx.effect("sync", require("./effect/sync"));

   //FILTERS
   ctx.filter("filter", require("./filter/filter"));

   //MODIFIES
   ctx.modify("password", require("./modify/password"));
   ctx.modify("set_default", require("./modify/set_default"));
   ctx.modify("set_target", require("./modify/set_target"));
   ctx.modify("set_user", require("./modify/set_user"));
   ctx.modify("default_payload", require("./modify/default_payload"));
   ctx.modify("increase", require("./modify/increase"));

   //MODELS
   ctx.model(require("./model/system_model.js"));
   ctx.model(require("./model/system_menu.js"));
   ctx.model(require("./model/system_submenu.js"));
   ctx.model(require("./model/system_user.js"));
   ctx.model(require("./model/system_admin.js"));

   // PLUGINS
   //await ctx.use(require("./defaults/plugin/file_storage"))
   await ctx.use(require("./plugin/login_register"));
};
