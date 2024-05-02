import envConfig from "@/config"
import { LoginResType } from "@/schemaValidations/auth.schema"

type CustomRequest = RequestInit & { baseUrl?: string | undefined}

class HttpError extends Error {
    status: number
    payload: any 

    constructor({status, payload} : {status: number, payload: any}){
        super('Http Error')
        this.status = status
        this.payload = payload
    }
}

class SessionToken {
    private token = ''
    get value() {
        return this.token
    }
    set value(token: string) {
        // Nếu gọi method này ở server thì sẽ bị lỗi
        if (typeof window === 'undefined') {
            throw new Error('Cannot set token on server side')
        }
        this.token = token
    }

}

export const clientSessionToken = new SessionToken()

const request = async <ResponseType>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomRequest | undefined) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined

    const baseHeader = {
        'Content-Type': 'application/json',
        Authorization: clientSessionToken.value
            ? `Bearer ${clientSessionToken.value}`
            : ''
    } 

    //Nếu không có options.baseUrl (hoặc = undefined) thì lấy gọi đến env 
    //Còn nếu '' thì gọi nextjs server hoặc gọi đến giá trị của baseUrl
    const baseURL = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl 
    const fullURL = url.startsWith('/') ? `${baseURL}${url}` : `${baseURL}/${url}`

    const res = await fetch(fullURL, {
        ...options, 
        headers: {
            ...baseHeader,            
            ...options?.headers,
        }, 
        body,
        method
    })

    const payload: ResponseType = await res.json()

    const data = {
        status: res.status,
        payload
    }

    if(!res.ok){
        throw new HttpError(data)
    }
    //interceptors 
    if (['auth/login', 'auth/register'].includes(url)) {
        clientSessionToken.value = (payload as LoginResType).data.token
    } else if ('/auth/logout'.includes(url)) {
        clientSessionToken.value = ''
    }

    return data
}

 const http = {
     get: <T>(url: string, options?: Omit<CustomRequest, 'body'>) => request<T>('GET', url, { ...options }),
    post : <T>(url: string , body: any, options?: Omit<CustomRequest, 'body'>) => request<T>('POST', url, {...options, body}),
    put : <T>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => request<T>('GET', url, {...options, body}),
    delete : <T>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => request<T>('GET', url, {...options, body})
}
export default http