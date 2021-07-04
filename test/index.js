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
      // We need set time because.Fookie didnt set all plugins.1 sec is enought.
      let res = await fookie.run({
         system: true,
         model: "system_user",
         method: "login",
         body: {
            email: "admin",
            password: "admin",
         },
      });
      let token = res.data; // You are system_admin now. (email:admin,password:admin default system_admin)
      res = await fookie.run({
         token,
         model: "todo",
         method: "getAll",
         query: {
            checked: false,
         },
      });

      console.log(res); // {warnings:[],data:[....],status:200}
   }, 1000);
})();
