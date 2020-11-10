const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    items: {
        type: [Object],
        auth: {
            read: ["self"],
            write: ["system"],
        }
    }
});

schema.methods.giveItem = async function(data) {
    this.items.push(data)
    await this.save()
    return true
}

module.exports = schema