export default schema = {
    mail: String,
    name: String,
    password: String,
    birthday: Date,
    inventory: Array,
    giveItem(data) {
        this.inventory.push(data)
    }
}