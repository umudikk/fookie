module.exports = async function (payload, ctx) {
   if (ctx.lodash.has(payload, "system")) {
      return payload.system;
   }
   let roles = ctx.helpers.defaultArrayCalc(payload, "role");

   if (roles.length == 0) return true;

   if (roles.every((e) => ctx.roles.has(e))) {
      for (let role of roles) {
         let res = await ctx.roles.get(role)(payload, ctx);
         let modifies = [];
         if (res) {
            try {
               modifies = ctx.models.get(payload.model).lifecycle[payload.method].resolve[role];
            } catch (error) {}
            await Promise.all(modifies.map((m) => ctx.modifies.get(m)(payload, ctx)));
            return true;
         }

         payload.response.warnings.push(`You are not: ${role}`);
         modifies = [];
         try {
            modifies = ctx.models.get(payload.model).lifecycle[payload.method].reject[role];
         } catch (error) {}
         if (modifies.length == 0) return false;
         else {
            payload.response.warnings.push(`Rejected Role found. Payload manupilated.: ${role}`);
         }
         await Promise.all(modifies.map((m) => ctx.modifies.get(m)(payload, ctx)));
      }
      return true;
   } else {
      throw Error("Missing role");
   }
};
