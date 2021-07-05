const Fookie = require("../src");
(async () => {
   const fookie = new Fookie();
   await fookie.connect("mongodb://localhost/fookie");

   fookie.model({
      name: "todo",
      display: "title",
      schema: {
         title: {
            type: "string",
         },
         content: {
            type: "string",
         },
         assignee: {
            relation: "system_user",
         },
         checked: {
            type: "boolean",
            default: false,
         },
      },
      fookie: {
         get: {
            role: ["loggedin"],
         },
         getAll: {
            role: ["loggedin"],
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
   });

   fookie.listen(3000);
   setTimeout(async () => {

   }, 1000);
})();
