const Fookie = require("../src/index.js");
(async () => {
   const fookie = new Fookie();
   await fookie.connect("mongodb://localhost/fookie");
   await fookie.listen(3000);
})();
