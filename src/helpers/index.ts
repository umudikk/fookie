import * as http from 'http'

export function hasFields(Model, body: object): boolean {
    let fields = Object.keys(Model.schema.paths)
    let keys = Object.keys(body)
    return keys.every(key => fields.includes(key))
}
export function response(status: Number, data: any): object {
    if (http.STATUS_CODES[String(status)]) {
        return {
            status,
            message:http.STATUS_CODES[String(status)],
            data
        }   
    } else {
        return {
            status:500,
            message:'Invalid Status',
            data
        }    
    }    
}


