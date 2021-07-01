module.exports = async (payload, ctx) => {
    let res = ctx.run({
        model:"webhook",
        method:"getAll",
        system: true,
        query:{
            model:payload.method,
            method:payload.method
        }
    })
    let webhooks = res.data
    for(let webhook of webhooks){
        ctx.axios.post(webhook.url,payload.body,{
            headers:{
                token:webhook.token
            }
        })
    }
};
