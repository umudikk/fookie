module.exports = {
   name: "system_admin",
   database:"mongoose",
   display: "_id",
   schema: {
      system_user: {
         relation: "system_user",
      },
   },
   lifecycle: {
      get: {
         role: ["system_admin"],
      },
      getAll: {
         role: ["system_admin"],
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
};
