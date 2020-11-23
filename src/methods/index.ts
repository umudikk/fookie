export async function _post(data) {
    let model = new this(data)
    let tmp = await model.save()
    return tmp
}
export async function _get(filter) {
    let tmp = this.findOne(filter)
    return tmp

}
export async function _delete(filter) {
    return await this.deleteOne(filter)
}
export async function _patch(filter, data) {
    let tmp = this.findOne(filter)
    for (let i in data) {
        tmp[i] = data[i]
    }
    return await tmp.save()
}

export async function _pagination(filter, option) {
    return this.paginate(filter, option)
} 