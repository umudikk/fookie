module.exports = {
   name: "menu",
   database:"system",
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
         rule:["need_key"],
      },
      post: {
         modify:["set_methods"],
         role: ["admin"],
         rule:["need_key"],
      },
      delete: {
         role: ["admin"],
         rule:["need_key"],
      },
      model: {
         role: ["everybodt"],
         rule:["need_key"],
      },
      size: {
         role: ["admin"],
         rule:["need_key"],
      },
   },
};
