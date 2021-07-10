module.exports = async function (payload, ctx) {
    let search = ["", null, undefined];
    let model = ctx.models.get(payload.model);
    let keys = ctx.lodash.keys(model.schema);
    for (let key of keys) {
       if (model.schema[key].onlyClient == true) {
          if (search.includes(payload.body[key])) {
             return false;
          }
       }
    }

    return true;
}