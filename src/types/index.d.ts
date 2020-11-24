
export interface Req {
    method: string,
    query: string
}

export interface Post extends Req {
    body: object
}
export interface Get extends Req {
 
}
export interface Delete extends Req {
 
}
export interface Update extends Req {
    body: object
}

