'use client'

import slideSessionAPI from "@/app/api/auth/slide-session/silde-session.api"
import { clientSessionToken } from "@/lib/https"
import { useRouter } from "next/navigation"

export default function SlideSession() {
    const router = useRouter()
    const resetSession = async () => {
        try {
            const result = await slideSessionAPI.slideSessionClient()
            if (result) {
                clientSessionToken.expiresAt = result.payload.data.expiresAt
            }
        } catch (error) {
            router.push('/login?sessionExpired=true')
        }
    }
  return (
    <div>
        <button onClick={resetSession}>
            Click to refresh expires time.
        </button>
    </div>
  )
}