module.exports = {
   name: "system_submenu",
   database:"mongoose",
   display: "_id",
   schema: {
      system_model: {
         relation: "system_model",
      },
      system_menu: {
         relation: "system_menu",
      },
      icon: {
         input: "text",
         type: "string",
      },
   },
   lifecycle: {
      get: {
         role: ["everybody"],
      },
      getAll: {
         filter: [],
         role: ["everybody"],
      },
      patch: {
         role: ["system_admin"],
         effect: ["sync"],
      },
      post: {
         role: ["system_admin"],
         effect: ["sync"],
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
};
