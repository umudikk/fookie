module.exports = {
   name: "system_menu",
   database:"mongoose",
   display: "name",
   schema: {
      name: {
         input: "text",
         required: true,
         type: "string",
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
         effect: [],
      },
      post: {
         role: ["system_admin"],
         effect: [],
      },
      delete: {
         role: ["system_admin"],
      },
      model: {
         role: [],
      },
      count: {
         role: ["system_admin"],
      },
   },
};
