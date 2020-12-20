export function hasFields(Model, body: object): boolean {
    let fields = Object.keys(Model.schema.paths)
    let keys = Object.keys(body)
    return keys.every(key => fields.includes(key))
}





export function response(status: Number, message: String, data: any): object {
    return {
        status,
        message,
        data
    }
}