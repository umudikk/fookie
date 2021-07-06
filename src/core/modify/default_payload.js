module.exports = async function (payload, ctx) {
   payload = ctx.lodash.merge(payload,{
      options: {
         simplified: false,
         deep: false,
      },
      response: {
         data: undefined,
         warnings: [],
         status: 200,
      },
      body: {},
      query: {},
      projection:{}
   } );
};
