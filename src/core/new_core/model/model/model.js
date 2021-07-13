module.exports = {
   name: "model",
   database:"system",
   display: "name",
   schema: {
      name: {
         input: "text",
         required: true,
         type: "string",
      },
      display: {
         input: "text",
         type: "string",
         default: "_id",
      },
      database: {
         input: "text",
         required: true,
         type: "string",
      },
      schema: {
         input: "json",
         required: true,
         type: "object",
      },
      lifecycle: {
         input: "json",
         required: true,
         type: "object",
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
