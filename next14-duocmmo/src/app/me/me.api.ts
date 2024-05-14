import http from "@/lib/https";
import { AccountResType, UpdateMeBodyType } from "@/schemaValidations/account.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const meAPI = {
    me: (sessionToken: string) => http.get<AccountResType>('account/me', {
        'headers': {
            Authorization: `Bearer ${sessionToken}`
        }
    }),
    meClient: () => http.get<AccountResType>('account/me'),
    updateMe: (body: UpdateMeBodyType) => http.put<MessageResType>('account/me', body)

}

export default meAPI