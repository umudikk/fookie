module.exports = async function (ctx) {
   ctx.store.set("default_life_cycle_controls", {
      get: {
         modify: {
            before: [],
            after: ["attributes"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter", "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      getAll: {
         modify: {
            before: [],
            after: ["attributes"],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter", "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      post: {
         modify: {
            before: ["set_default", "increase"],
            after: ["attributes"],
         },
         rule: {
            before: ["has_fields", "check_type", "check_required"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "has_fields", "only_client", "has_body"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter", "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      patch: {
         modify: {
            before: ["set_target"],
            after: ["attributes"],
         },
         rule: {
            before: ["need_target", "has_fields", "check_type", "check_required"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "has_body"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter", "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      delete: {
         modify: {
            before: ["set_target"],
            after: [],
         },
         rule: {
            before: ["need_target"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter", "simplified"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      count: {
         modify: {
            before: [],
            after: [],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
         },
         filter: {
            before: [],
            after: [],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      model: {
         modify: {
            before: [],
            after: [],
         },
         rule: {
            before: [],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method"],
            after: [],
         },
         filter: {
            before: [],
            after: ["filter"],
         },
         effect: {
            before: [],
            after: [],
         },
      },
      test: {
         modify: {
            before: [],
            after: [],
         },
         rule: {
            before: ["has_fields", "check_type"],
            after: ["check_auth"],
         },
         preRule: {
            before: ["has_model", "has_method", "has_fields", "need_method_in_options"],
            after: [],
         },
         filter: {
            before: [],
            after: [],
         },
         effect: {
            before: [],
            after: [],
         },
      },
   });
};
