module.exports = {
   name: "system_user",
   database:"mongoose",
   display: "email",
   schema: {
      email: {
         onlyClient:true,
         required: true,
         type: "string",
         input: "text",
      },
      password: {
         onlyClient:true,
         required: true,
         type: "string",
         input: "password",
         read: ["nobody"],
      },
      type: {
         type: "string",
         input: "text",
      },
   },
   fookie: {
      get: {
         role: ["system_admin"],
      },
      getAll: {
         role: ["system_admin"],
         reject:{
            system_admin:["test"]
         }
      },
      patch: {
         role: ["system_admin"],
      },
      post: {
         role: ["system_admin"],
         modify: ["password"],
         reject:{
            system_admin:["test"]
         }
      },
      delete: {
         role: ["system_admin"],
      },
      model: {
         role: ["everybody"],
      },
      login: {
         preRule: ["has_pwemail"],
      },
      register: {
         preRule: ["has_pwemail"],
      },
   },
};
