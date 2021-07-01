module.exports = async function (payload, ctx) {
   payload = ctx.lodash.merge(payload, {
      options: {
         simplified: false,
         deep: false,
      },
      attributes: [],
      response: {
         data: undefined,
         warnings: [],
         status: 200,
      },
      body: {},
      query: {},
   });
};
