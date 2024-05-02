import http from "@/lib/https"
import { MessageResType } from "@/schemaValidations/common.schema"
import { headers } from "next/headers"

const logoutAPI = {

    logoutServer: (sessionToken: string) =>
        http.post<MessageResType>('auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        }),
    logoutClient: () => http.post<MessageResType>('api/auth/logout', {}, { baseUrl: '' })

}

export default logoutAPI