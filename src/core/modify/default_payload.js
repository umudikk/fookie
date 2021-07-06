module.exports = async function (payload, ctx) {
   payload = ctx.lodash.merge(payload,{
      options: {
      
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
