const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'inventory' },
});

schema.methods.isOwner = function isOwner(player) {
    return (this.target == player.phone.sim._id) ? true : false
}


module.exports = mongoose.model('User', schema);