const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    items: [Object]
});

schema.methods.giveItem = async function(data) {
    this.items.push(data)
    await this.save()
    return true
}

module.exports = mongoose.model('inventory', schema);