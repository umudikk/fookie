var multer = require("multer");

module.exports = async function (ctx) {
   var storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, "/uploads");
      },
      filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now());
      },
   });

   ctx.upload = multer({ storage: storage });

   ctx.model({
      name: "system_file",
      display: "name",
      schema: {
         name: {
            type: "string",
            required: true,
         },
         mimeType: {
            type: "string",
         },
         path: {
            type: "string",
         },
         byte: {
            type: "number",
         },
      },
      gateway: {
         get: {
            rule: ["system_admin"],
         },
         getAll: {
            rule: ["system_admin"],
         },
         patch: {
            rule: ["system_admin"],
            effect: ["form_data"],
         },
         post: {
            rule: ["system_admin"],
            effect: ["form_data"],
         },
         delete: {
            rule: ["system_admin"],
            effect: ["form_data"],
         },
         model: {
            rule: ["everybody"],
         },
      },
   });

   ctx.effect("form_data", function (payload, ctx) {
      ctx.upload(payload.req, null, async function (err) {
         console.log(err);
      });
   });
};
