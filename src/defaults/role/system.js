module.exports =  async function ({ user, req, body, model, query, method, ctx }) {
    return user.system ? true : false
}