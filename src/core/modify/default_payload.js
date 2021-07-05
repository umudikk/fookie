module.exports = async function (payload, ctx) {
   payload = ctx.lodash.merge(payload, {
      options: {
         method:"get",//todo hata sysapıyor mu kontrol et
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
   });
};
