module.exports = function(model, body, method, selector) {
    let methods = ['patch']
    if (!(methods.includes(method))) {
        return model.fookie[method][selector ? selector : "auth"]

    } else {
        let set = new Set()
        let keys = Object.keys(body)
        for (let field of keys) {
            if (model.schema[field]) {
                model.schema[field].fookie[method].auth.forEach(element => {
                    set.add(element)
                });
            }
        }
        return Array.from(set)
    }
}