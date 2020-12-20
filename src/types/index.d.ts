
export interface Req {
    method: string,
    query: string,
    body: object,
}

type Method = 'post' | 'get' | 'delete' | 'patch'


