import { decodeJWT } from "@/lib/utils";
import { cookies } from "next/headers"

const a = {
    "userId": 5,
    "tokenType": "sessionToken",
    "iat": 1714978102,
    "exp": 1746514102
}

type jwtPayloadType = {
    userId: number;
    tokenType: string;
    iat: number;
    exp: number;
}

export async function POST(request: Request) {
    const req = await request.json()
    const token = req.sessionToken
    if (!token) {
        return Response.json({
            message: 'No Token Found'
        }, {
            status: 400,
        })
    }
    const jwtPayload = decodeJWT<jwtPayloadType>(token)
    const expiresTime = new Date(jwtPayload.exp * 1000).toUTCString();
    return Response.json(req, {
        status: 200,
        headers: { 'Set-Cookie': `sessionToken=${token};  Path=/; HttpOnly; Expires=${expiresTime}; Secure; SameSite=Lax;` },
    })
}