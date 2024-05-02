import http from "@/lib/https";
import { AccountResType } from "@/schemaValidations/account.schema";

const meAPI = {
    me: (sessionToken: string) => http.get<AccountResType>('account/me', {
        'headers': {
            Authorization: `Bearer ${sessionToken}`
        }
    }),
    meClient: () => http.get<AccountResType>('account/me'),
}

export default meAPI