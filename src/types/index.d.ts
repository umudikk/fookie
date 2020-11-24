type Method = "post" | "get" | "patch" | "delete"

export interface Req {
    method: Method,
    query: string
}

export interface Post extends Req {
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
