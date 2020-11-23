export interface Req {
    method: string,
    query: string
}

export interface Post {
    body: object
}
export interface Get extends Req {

}
export interface Delete extends Req {

}
export interface Patch extends Req {
    body: object
}
export interface Put extends Req {
    body: object
}

export interface rawQuery {
    modelName: string,
    rawQuery: string
}