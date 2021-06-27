module.exports = async (payload, ctx) => {
    console.log(
        `[RESPONSE] ${payload.model} | ${payload.method} | [${payload.response.warnings}] | ${payload.response.status}`
     );
};
