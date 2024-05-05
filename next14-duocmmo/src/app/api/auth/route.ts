import { cookies } from "next/headers"

export async function POST(request: Request) {
    const res = await request.json()
    const token = res.sessionToken
    if (!token) {
        return Response.json({
            message: 'No Token Found'
        }, {
            status: 400,
        })
    }
    return Response.json(res, {
        status: 200,
        headers: { 'Set-Cookie': `sessionToken=${token};  Path=/; HttpOnly ` },
    })
}