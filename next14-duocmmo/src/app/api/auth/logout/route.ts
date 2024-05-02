import { cookies } from "next/headers"
import logoutAPI from "./logout.api"
import { HttpError } from "@/lib/https"

export async function POST() {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("sessionToken")?.value

    if (!sessionToken) {
        return Response.json({
            message: 'No Token Found'
        }, {
            status: 400,
        })
    }

    try {
        const result = await logoutAPI.logoutServer(sessionToken)
        if (result) {
            return Response.json(result.payload, {
                status: 200,
                headers: { 'Set-Cookie': `sessionToken=; Path=/` },
            })
        }
    } catch (error) {
        if (error instanceof HttpError) {
            return Response.json(error.payload, {
                status: error.status,
            })
        } else {
            return Response.json({
                message: 'Unknown Error'
            }, {
                status: 500
            })
        }
    }

}