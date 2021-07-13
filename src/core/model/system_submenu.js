module.exports = {
   name: "submenu",
   database:"system",
   display: "_id",
   schema: {
      model: {
         relation: "model",
      },
      menu: {
         relation: "menu",
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
         role: ["admin"],
         effect: ["sync"],
      },
      post: {
         role: ["admin"],
         effect: ["sync"],
      },
      delete: {
         role: ["admin"],
      },
      model: {
         role: ["everybody"],
      },
      count: {
         role: ["admin"],
      },
   },
};
