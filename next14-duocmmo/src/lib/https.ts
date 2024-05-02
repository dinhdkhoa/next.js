import envConfig from "@/config"
import { LoginResType } from "@/schemaValidations/auth.schema"

type CustomRequest = RequestInit & { baseUrl?: string | undefined }

const FORM_ERROR_STATUS = 422

type FormErrorPayload = {
    message: string,
    errors: {
        field: string,
        message: string
    }[]
}

export class HttpError extends Error {
    status: number
    payload: {
        message: string,
        [key: string] :any
    }

    constructor({ status, payload }: { status: number, payload: any }) {
        super(payload.message)
        this.status = status
        this.payload = payload
    }
}

export class FormError extends HttpError {
    status: 422
    payload: FormErrorPayload

    constructor({ status, payload }: { status: 422, payload: FormErrorPayload }) {
        super({ status: 422, payload: payload })
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
/**
 *  chỉ lấy đc ở client, với server 
 * nếu muốn có gắn sessionToken vào header phải lấy từ cookies() - next/headers
 */
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
    console.log(res)


    const payload: ResponseType = await res.json()

    const data = {
        status: res.status,
        payload
    }
    //interceptors 

    if (!res.ok) {
        if (res.status == FORM_ERROR_STATUS){
            throw new FormError({
                status: 422,
                payload: data.payload as FormErrorPayload
            })
        } else {
            throw new HttpError(data)
        }
    }

    if(typeof window !== undefined){
        if (url === 'auth/login' || url === 'auth/register') {
            clientSessionToken.value = (payload as LoginResType).data.token;
        } else if (url === 'auth/logout') {
            clientSessionToken.value = '';
        }
    }

    return data
}

const http = {
    get: <T>(url: string, options?: Omit<CustomRequest, 'body'>) => request<T>('GET', url, { ...options }),
    post: <T>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => request<T>('POST', url, { ...options, body }),
    put: <T>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => request<T>('GET', url, { ...options, body }),
    delete: <T>(url: string, body: any, options?: Omit<CustomRequest, 'body'>) => request<T>('GET', url, { ...options, body })
}
export default http