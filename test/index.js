const Fookie = require("../src/index.js");
const fookie = new Fookie();
fookie.connect("mongodb://localhost/fookie");
fookie.listen(3000);
