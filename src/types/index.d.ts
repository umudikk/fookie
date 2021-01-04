
export interface Req {
    method: string,
    query: string,
    body: object,
}

export interface Login {
    email: string,
    password: string,
}

type Method = 'post' | 'get' | 'delete' | 'patch'


