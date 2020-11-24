

export async function _post({body}) {
    let model = new this(body)
    let tmp = await model.save()
    return tmp
}
export async function _get({filter}) {
    let tmp = this.findOne(filter)
    return tmp

}
export async function _delete({filter}) {
    return await this.deleteOne(filter)
}
export async function _patch({filter, body}) {
    let tmp = this.findOne(filter)
    for (let i in body) {
        tmp[i] = body[i]
    }
    return await tmp.save()
}

export async function _pagination({filter, body}) {
    return this.paginate(filter, body)
} 