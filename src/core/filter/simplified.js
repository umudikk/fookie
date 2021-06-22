
const lodash = require("lodash")
module.exports = async function (payload) {
   if(lodash.has(payload.options,"simplified") && payload.options.simplified === true){
      payload.response.data = lodash.values(payload.response.data)
      console.log("simplified");
   }else{
      console.log("no simplified");
   }
};
