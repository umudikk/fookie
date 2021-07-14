module.exports = {
   name: "user",
   database: "mongoose",
   display: "email",
   schema: {
      email: {
         onlyClient:true,
         unique: true,
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
   lifecycle: {
      get: {
         role: ["admin"],
      },
      getAll: {
         role: ["admin"],
      },
      patch: {
         role: ["admin"],
      },
      post: {
         role: ["admin"],
         modify: ["password"],
      },
      delete: {
         rule:["is_last_admin"], //TODO: eğer admin tek kaldıysa izin verme silmesine
         role: ["admin"],
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
