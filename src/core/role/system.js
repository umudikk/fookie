module.exports = async function ({ user }) {
   if (user == null || user == {} || user == undefined) return false;
   if (user.hasOwnProperty("system") && typeof user.system == "boolean") {
      return user.system;
   } else {
      return false;
   }
};
