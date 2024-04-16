import { cookies } from "next/headers"

export async function POST(request: Request) {
    const req = await request.json()
    const token = req.payload?.data?.token
    if (!token) {
        return Response.json({
            message: 'No Token Found'
        }, {
            status: 400,
        })
    }
    return Response.json(req.payload, {
        status: 200,
        headers: { 'Set-Cookie': `sessionToken=${token}; Path=/` },
    })
}